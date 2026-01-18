'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Snackbar, Alert, AlertColor, AlertProps, SnackbarProps } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ApiError, isApiError, hasFieldErrors } from '@/core/sdk';

// ===== Tipos =====

interface SnackbarOptions {
  duration?: number;
  action?: ReactNode;
  anchorOrigin?: SnackbarProps['anchorOrigin'];
  variant?: AlertProps['variant'];
}

interface SnackbarState {
  open: boolean;
  message: string;
  severity: AlertColor;
  options: SnackbarOptions;
}

interface SnackbarContextValue {
  showSuccess: (message: string, options?: SnackbarOptions) => void;
  showError: (messageOrError: string | ApiError | unknown, options?: SnackbarOptions) => void;
  showWarning: (message: string, options?: SnackbarOptions) => void;
  showInfo: (message: string, options?: SnackbarOptions) => void;
  showApiError: (error: ApiError | unknown, options?: SnackbarOptions) => void;
}

// ===== Context =====

const SnackbarContext = createContext<SnackbarContextValue | null>(null);

// ===== Provider =====

interface SnackbarProviderProps {
  children: ReactNode;
  defaultDuration?: number;
  defaultAnchorOrigin?: SnackbarProps['anchorOrigin'];
  defaultVariant?: AlertProps['variant'];
}

export function SnackbarProvider({
  children,
  defaultDuration = 5000,
  defaultAnchorOrigin = { vertical: 'bottom', horizontal: 'right' },
  defaultVariant = 'filled',
}: SnackbarProviderProps) {
  const { t } = useTranslation();

  const [state, setState] = useState<SnackbarState>({
    open: false,
    message: '',
    severity: 'info',
    options: {},
  });

  const show = useCallback(
    (message: string, severity: AlertColor, options: SnackbarOptions = {}) => {
      setState({
        open: true,
        message,
        severity,
        options: {
          duration: options.duration ?? defaultDuration,
          anchorOrigin: options.anchorOrigin ?? defaultAnchorOrigin,
          variant: options.variant ?? defaultVariant,
          action: options.action,
        },
      });
    },
    [defaultDuration, defaultAnchorOrigin, defaultVariant]
  );

  const handleClose = useCallback((_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setState((prev) => ({ ...prev, open: false }));
  }, []);

  // Extrai mensagem de ApiError
  const extractErrorMessage = useCallback(
    (error: ApiError | unknown): string => {
      if (!isApiError(error)) {
        return t('UNEXPECTED_ERROR', { defaultValue: 'Erro inesperado' });
      }

      // Se tem fieldErrors, lista os campos
      if (hasFieldErrors(error)) {
        const fields = error.fieldErrors!.map((fe) => t(`${fe.message}`, { defaultValue: fe.message }));
        return fields.join(' | ');
      }

      // Mensagem traduzida ou fallback
      if (error.message) {
        return t(`${error.message}`, { defaultValue: error.message });
      }

      // Fallback por status
      const statusMessages: Record<number, string> = {
        400: 'Requisição inválida',
        401: 'Não autorizado',
        403: 'Acesso negado',
        404: 'Não encontrado',
        500: 'Erro interno do servidor',
        0: 'Erro de conexão',
      };

      return t(`HTTP_${error.status}`, {
        defaultValue: statusMessages[error.status] || `Erro ${error.status}`,
      });
    },
    [t]
  );

  // ===== API pública =====

  const showSuccess = useCallback(
    (message: string, options?: SnackbarOptions) => {
      show(t(message, { defaultValue: message }), 'success', options);
    },
    [show, t]
  );

  const showWarning = useCallback(
    (message: string, options?: SnackbarOptions) => {
      show(t(message, { defaultValue: message }), 'warning', options);
    },
    [show, t]
  );

  const showInfo = useCallback(
    (message: string, options?: SnackbarOptions) => {
      show(t(message, { defaultValue: message }), 'info', options);
    },
    [show, t]
  );

  const showApiError = useCallback(
    (error: ApiError | unknown, options?: SnackbarOptions) => {
      const message = extractErrorMessage(error);
      show(message, 'error', options);
    },
    [show, extractErrorMessage]
  );

  // showError aceita string OU ApiError
  const showError = useCallback(
    (messageOrError: string | ApiError | unknown, options?: SnackbarOptions) => {
      if (typeof messageOrError === 'string') {
        show(t(messageOrError, { defaultValue: messageOrError }), 'error', options);
      } else {
        showApiError(messageOrError, options);
      }
    },
    [show, showApiError, t]
  );

  const value: SnackbarContextValue = {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showApiError,
  };

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <Snackbar
        open={state.open}
        autoHideDuration={state.options.duration}
        onClose={handleClose}
        anchorOrigin={state.options.anchorOrigin}
        action={state.options.action}
      >
        <Alert onClose={handleClose} severity={state.severity} variant={state.options.variant} sx={{ width: '100%' }}>
          {state.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
}

// ===== Hook =====

export function useSnackbar(): SnackbarContextValue {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within SnackbarProvider');
  }
  return context;
}
