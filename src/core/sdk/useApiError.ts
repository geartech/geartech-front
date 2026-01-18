import { useCallback } from 'react';
import { UseFormSetError, FieldValues, Path } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ApiError, isApiError, hasFieldErrors } from '@/core/sdk';

interface UseApiErrorOptions<T extends FieldValues> {
  setError: UseFormSetError<T>;
  onError?: (error: ApiError) => void;
}

/**
 * Hook para tratamento padronizado de erros da API em formulários.
 *
 * - FAIL com fieldErrors → seta erros nos campos do form
 * - ERROR → chama onError callback (toast, etc)
 */
export function useApiError<T extends FieldValues>({ setError, onError }: UseApiErrorOptions<T>) {
  const { t } = useTranslation();

  const handleError = useCallback(
    (error: unknown) => {
      if (!isApiError(error)) {
        console.error('Unexpected error:', error);
        onError?.({
          status: 500,
          processed: 'ERROR',
          message: 'UNEXPECTED_ERROR',
        });
        return;
      }

      // FAIL com fieldErrors → seta nos campos
      if (hasFieldErrors(error)) {
        error.fieldErrors!.forEach((fe) => {
          const fieldName = fe.field as Path<T>;
          const message = t(`errors.${fe.message}`, { defaultValue: fe.message });
          setError(fieldName, { type: 'server', message });
        });
        return;
      }

      // ERROR ou FAIL sem fieldErrors → callback
      onError?.(error);
    },
    [setError, onError, t]
  );

  return { handleError };
}
