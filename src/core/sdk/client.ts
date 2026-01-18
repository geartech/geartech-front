import { Api } from './api';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { ApiResponse, ApiError } from './types';

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

// ===== Logout =====

const logout = async () => {
  try {
    await geartechApi.auth.logout();
  } catch {}
  window.location.href = '/pages/public/login';
};

// ===== Interceptors =====

function applyInterceptors(instance: typeof api) {
  instance.interceptors.response.use(
    (response: AxiosResponse<ApiResponse>) => {
      const apiResponse = response.data;

      // Se não tem estrutura ApiResponse (ex: download de arquivo), retorna direto
      if (!apiResponse || typeof apiResponse.processed === 'undefined') {
        return response;
      }

      // SUCCESS → extrai data
      if (apiResponse.processed === 'SUCCESS') {
        return {
          ...response,
          data: apiResponse.data,
        } as AxiosResponse;
      }

      // FAIL ou ERROR → rejeita com estrutura tipada
      const error: ApiError = {
        status: apiResponse.status,
        processed: apiResponse.processed,
        message: apiResponse.message,
        fieldErrors: apiResponse.fieldErrors,
        data: apiResponse.data,
      };
      return Promise.reject(error);
    },
    async (error: AxiosError<ApiResponse>) => {
      const originalRequest = error.config as typeof error.config & { _retry?: boolean };

      // Auth refresh logic
      const isAuthEndpoint =
        originalRequest?.url?.includes('/auth/login') || originalRequest?.url?.includes('/auth/refresh');

      if (error.response?.status === 401 && !originalRequest?._retry && !isAuthEndpoint) {
        originalRequest._retry = true;
        try {
          await refreshApi.post('/auth/refresh');
          return instance(originalRequest);
        } catch {
          logout();
          return Promise.reject(error);
        }
      }

      if (error.response?.status === 401 && isAuthEndpoint) {
        logout();
      }

      // Se tem resposta do backend no formato ApiResponse
      if (error.response?.data && typeof error.response.data.processed !== 'undefined') {
        const apiResponse = error.response.data;
        const apiError: ApiError = {
          status: apiResponse.status,
          processed: apiResponse.processed,
          message: apiResponse.message,
          fieldErrors: apiResponse.fieldErrors,
          data: apiResponse.data,
        };
        return Promise.reject(apiError);
      }

      // Erro de rede ou resposta não-JSON
      const networkError: ApiError = {
        status: error.response?.status || 0,
        processed: 'ERROR',
        message: 'NETWORK_ERROR',
      };
      return Promise.reject(networkError);
    }
  );
}

// ===== SDK Geartech =====

export const geartechApi = new Api({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/',
  withCredentials: true,
});

geartechApi.instance.defaults.withCredentials = true;
applyInterceptors(geartechApi.instance);
