'use client';

import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { ReactNode } from 'react';
import { SxProps, Theme } from '@mui/material/styles';

export type ButtonType = 'button' | 'submit' | 'success' | 'reset' | 'cancel' | 'delete' | 'back' | 'info' | 'warning';

export type ButtonColor = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'inherit';

// =============================
// PALETA UX CORPORATIVA
// =============================
const buttonColors = {
  submit: { main: '#1976D2', hover: '#1565C0' },
  success: { main: '#2E7D32', hover: '#1B5E20' },
  reset: { main: '#9E9E9E', hover: '#757575' },
  cancel: { main: '#6B7280', hover: '#4B5563' },
  back: { main: '#64748B', hover: '#475569' },
  info: { main: '#0288D1', hover: '#01579B' },
  warning: { main: '#ED6C02', hover: '#E65100' },
  delete: { main: '#D32F2F', hover: '#B71C1C' },
};

// Configuração padrão por buttonType
const BUTTON_TYPE_CONFIG: Record<
  ButtonType,
  {
    color: ButtonColor;
    variant: ButtonProps['variant'];
    htmlType: 'button' | 'submit';
    disableOnSubmitting: boolean;
    sx?: SxProps<Theme>;
  }
> = {
  button: {
    color: 'primary',
    variant: 'contained',
    htmlType: 'button',
    disableOnSubmitting: true,
  },
  submit: {
    color: 'primary',
    variant: 'contained',
    htmlType: 'submit',
    disableOnSubmitting: true,
    sx: {
      backgroundColor: buttonColors.submit.main,
      '&:hover': { backgroundColor: buttonColors.submit.hover },
    },
  },
  success: {
    color: 'success',
    variant: 'contained',
    htmlType: 'submit',
    disableOnSubmitting: true,
    sx: {
      backgroundColor: buttonColors.success.main,
      '&:hover': { backgroundColor: buttonColors.success.hover },
    },
  },
  reset: {
    color: 'inherit',
    variant: 'outlined',
    htmlType: 'button',
    disableOnSubmitting: true,
    sx: {
      borderColor: buttonColors.reset.main,
      color: buttonColors.reset.main,
      '&:hover': {
        borderColor: buttonColors.reset.hover,
        backgroundColor: 'rgba(158, 158, 158, 0.08)',
      },
    },
  },
  cancel: {
    color: 'inherit',
    variant: 'outlined',
    htmlType: 'button',
    disableOnSubmitting: false,
    sx: {
      borderColor: buttonColors.cancel.main,
      color: buttonColors.cancel.main,
      '&:hover': {
        borderColor: buttonColors.cancel.hover,
        backgroundColor: 'rgba(107, 114, 128, 0.08)',
      },
    },
  },
  delete: {
    color: 'error',
    variant: 'contained',
    htmlType: 'button',
    disableOnSubmitting: false,
    sx: {
      backgroundColor: buttonColors.delete.main,
      '&:hover': { backgroundColor: buttonColors.delete.hover },
    },
  },
  back: {
    color: 'inherit',
    variant: 'outlined',
    htmlType: 'button',
    disableOnSubmitting: false,
    sx: {
      borderColor: buttonColors.back.main,
      color: buttonColors.back.main,
      '&:hover': {
        borderColor: buttonColors.back.hover,
        backgroundColor: 'rgba(100, 116, 139, 0.08)',
      },
    },
  },
  info: {
    color: 'info',
    variant: 'contained',
    htmlType: 'button',
    disableOnSubmitting: false,
    sx: {
      backgroundColor: buttonColors.info.main,
      '&:hover': { backgroundColor: buttonColors.info.hover },
    },
  },
  warning: {
    color: 'warning',
    variant: 'contained',
    htmlType: 'button',
    disableOnSubmitting: false,
    sx: {
      backgroundColor: buttonColors.warning.main,
      '&:hover': { backgroundColor: buttonColors.warning.hover },
    },
  },
};

export interface ButtonProps extends Omit<MuiButtonProps, 'color' | 'type'> {
  children: ReactNode;
  buttonType?: ButtonType;
  loading?: boolean;
  loadingText?: string;
  color?: ButtonColor;
}

export function Button({
  children,
  buttonType = 'button',
  loading = false,
  loadingText,
  color,
  variant,
  disabled,
  onClick,
  sx,
  ...buttonProps
}: ButtonProps) {
  const config = BUTTON_TYPE_CONFIG[buttonType];

  // Props finais (usuário pode sobrescrever)
  const finalColor = color ?? config.color;
  const finalVariant = variant ?? config.variant;
  const finalHtmlType = config.htmlType;

  // Merge sx: config.sx + sx do usuário
  const finalSx: SxProps<Theme> = [config.sx || {}, ...(Array.isArray(sx) ? sx : [sx])];

  const isLoading = loading;

  return (
    <MuiButton
      type={finalHtmlType}
      variant={finalVariant}
      size="small"
      color={finalColor}
      disabled={disabled || isLoading}
      onClick={onClick}
      sx={finalSx}
      {...buttonProps}
    >
      {isLoading ? (
        <>
          <CircularProgress
            size={20}
            color="inherit"
            sx={{ mr: 1 }}
          />
          {loadingText || children}
        </>
      ) : (
        children
      )}
    </MuiButton>
  );
}
