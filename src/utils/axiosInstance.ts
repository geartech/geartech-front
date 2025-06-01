import axios from 'axios';

// Pegue o token de onde guardar (localStorage, cookie, etc)
function getAccessToken() {
  return localStorage.getItem('accessToken');
}
function getRefreshToken() {
  return localStorage.getItem('refreshToken');
}
function setTokens({ accessToken, refreshToken }: { accessToken: string; refreshToken?: string }) {
  localStorage.setItem('accessToken', accessToken);
  if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
}

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api', // defina sua base!
  timeout: 10000,
});

// Interceptor para adicionar token
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para refresh automático
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Caso status 401 e não seja /login ou /refresh
    if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url.includes('/login')) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = 'Bearer ' + token;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Faça a chamada para refresh (ajuste endpoint)
        const refreshToken = getRefreshToken();
        const res = await axios.post('/api/auth/refresh', { refreshToken });
        const { accessToken, refreshToken: newRefreshToken } = res.data;
        setTokens({ accessToken, refreshToken: newRefreshToken });

        api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        processQueue(null, accessToken);

        originalRequest.headers['Authorization'] = 'Bearer ' + accessToken;
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        // Aqui: deslogue usuário, limpe tokens, redirecione, etc
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
