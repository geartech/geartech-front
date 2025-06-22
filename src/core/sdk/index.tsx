import { Api } from './api'; // SDK gerado pelo swagger-typescript-api
import axios from 'axios';

// ===== Instâncias Axios =====
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/',
  withCredentials: true,
  timeout: 30000,
});

const refreshApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/',
  withCredentials: true,
});

// ===== Interceptors customizados =====

function logout() {
  document.cookie = 'accessToken=; Max-Age=0; path=/';
  document.cookie = 'refreshToken=; Max-Age=0; path=/';
  // Redireciona para login
  window.location.href = '/public/login';
}

function applyCustomInterceptors(instance: typeof api) {
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      const isAuthEndpoint =
        originalRequest.url?.includes('/auth/login') || originalRequest.url?.includes('/auth/refresh');

      if (error.response?.status === 401 && !originalRequest._retry && !isAuthEndpoint) {
        originalRequest._retry = true;

        try {
          await refreshApi.post('/auth/refresh');
          return api(originalRequest);
        } catch (err) {
          logout();
          return Promise.reject(err);
        }
      }

      if (error.response?.status === 401 && isAuthEndpoint) {
        logout();
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
  withCredentials: true,
});

// usa credenciais
geartechApi.instance.defaults.withCredentials = true;

// SDK usa internamente o Axios próprio, mas agora com os mesmos interceptors!
applyCustomInterceptors(geartechApi.instance);

// ===== Como usar =====

// Apenas use geartechApi no app inteiro:
// await geartechApi.auth.login({ username: '...', password: '...' });
