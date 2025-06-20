import { Api } from './api'; // SDK gerado pelo swagger-typescript-api
import axios, { AxiosRequestConfig } from 'axios';

// ===== Token Utils =====

function getAccessToken() {
  return localStorage.getItem('accessToken');
}

function setTokens({ accessToken }: { accessToken: string }) {
  localStorage.setItem('accessToken', accessToken);
}

function clearTokens() {
  localStorage.removeItem('accessToken');
}

// ===== Instâncias Axios =====

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/',
  timeout: 10000,
});

const refreshApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/',
  withCredentials: true,
});

// ===== Fila de tentativas para refresh =====

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

// ===== Interceptors customizados =====

function applyCustomInterceptors(instance: typeof api) {
  // Request
  instance.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Response
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest: AxiosRequestConfig & { _retry?: boolean } = error.config;

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
}

// Aplique nos dois
applyCustomInterceptors(api);

// ===== SDK Geartech =====

export const geartechApi = new Api({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/',
  // Outras configs fixas se quiser
});

// SDK usa internamente o Axios próprio, mas agora com os mesmos interceptors!
applyCustomInterceptors(geartechApi.instance);

// ===== Como usar =====

// Apenas use geartechApi no app inteiro:
// await geartechApi.auth.login({ username: '...', password: '...' });
