/**
 * Tipos da resposta padronizada da API.
 * Espelha o ApiResponse<T> do backend.
 */

export type ProcessStatus = 'SUCCESS' | 'FAIL' | 'ERROR';

export interface FieldError {
  field: string;
  message: string;
}

export interface ApiResponse<T = unknown> {
  status: number;
  processed: ProcessStatus;
  message?: string;
  fieldErrors?: FieldError[];
  data?: T;
}

export interface ApiError {
  status: number;
  processed: ProcessStatus;
  message?: string;
  fieldErrors?: FieldError[];
  data?: unknown;
}

export function isApiError(error: unknown): error is ApiError {
  return typeof error === 'object' && error !== null && 'processed' in error && 'status' in error;
}

export function hasFieldErrors(error: ApiError): boolean {
  return error.processed === 'FAIL' && Array.isArray(error.fieldErrors) && error.fieldErrors.length > 0;
}
