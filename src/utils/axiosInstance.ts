import axios, { AxiosRequestConfig } from 'axios';

// Access Token continua sendo salvo no localStorage normalmente
function getAccessToken() {
  return localStorage.getItem('accessToken');
}
function setTokens({ accessToken }: { accessToken: string }) {
  localStorage.setItem('accessToken', accessToken);
}
function clearTokens() {
  localStorage.removeItem('accessToken');
}

// Instância principal do Axios
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  timeout: 10000,
});

// Instância separada para o refresh (envia cookies HttpOnly)
const refreshApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  withCredentials: true, // Permite enviar cookies HttpOnly
});

// Adiciona access token nas requisições
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Tipos para a fila de tentativas
type FailedQueueItem = {
  resolve: (token: string | null) => void;
  reject: (error: unknown) => void;
};

let isRefreshing = false;
let failedQueue: FailedQueueItem[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Interceptor para resposta (inclui o fluxo de refresh)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest: AxiosRequestConfig & { _retry?: boolean } = error.config;

    // Se for 401 e não estiver em /login e não for retry
    if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url?.includes('/login')) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (token && originalRequest.headers) {
              originalRequest.headers['Authorization'] = 'Bearer ' + token;
            }
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Aqui não passa refreshToken, só chama o endpoint (o cookie vai junto)
        const res = await refreshApi.post('/auth/refresh');
        const { accessToken } = res.data;

        setTokens({ accessToken });

        api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        processQueue(null, accessToken);

        if (originalRequest.headers) {
          originalRequest.headers['Authorization'] = 'Bearer ' + accessToken;
        }
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        clearTokens();
        window.location.href = '/login';
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
