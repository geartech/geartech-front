'use client';

import { useFormContext } from 'react-hook-form';
import Button, { ButtonProps } from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { ReactNode } from 'react';
import { SxProps, Theme } from '@mui/material/styles';

export type FormButtonType =
  | 'button'
  | 'submit'
  | 'success'
  | 'reset'
  | 'cancel'
  | 'delete'
  | 'back'
  | 'info'
  | 'warning';

export type FormButtonColor = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'inherit';

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
  FormButtonType,
  {
    color: FormButtonColor;
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

export interface FormButtonProps extends Omit<ButtonProps, 'color' | 'type' | 'onClick'> {
  children: ReactNode;
  buttonType?: FormButtonType;
  loading?: boolean;
  loadingText?: string;
  color?: FormButtonColor;
  disableOnSubmitting?: boolean;
  onClick?: (data: unknown) => void | Promise<void>;
  onCancel?: () => void;
  onDelete?: () => void | Promise<void>;
  onBack?: () => void;
  onInfo?: () => void;
  onWarning?: () => void;
  confirmMessage?: string;
  keepDefaultValues?: boolean;
}

export function FormButton({
  children,
  buttonType = 'button',
  loading = false,
  loadingText,
  color,
  variant,
  disabled,
  disableOnSubmitting,
  onClick,
  onCancel,
  onDelete,
  onBack,
  onInfo,
  onWarning,
  confirmMessage,
  keepDefaultValues = true,
  sx,
  ...buttonProps
}: FormButtonProps) {
  const formContext = useFormContext();
  const isSubmitting = formContext?.formState?.isSubmitting || false;

  const config = BUTTON_TYPE_CONFIG[buttonType];

  // Props finais (usuário pode sobrescrever)
  const finalColor = color ?? config.color;
  const finalVariant = variant ?? config.variant;
  const finalDisableOnSubmitting = disableOnSubmitting ?? config.disableOnSubmitting;
  const finalHtmlType = config.htmlType;

  // Merge sx: config.sx + sx do usuário + width
  const finalSx: SxProps<Theme> = [config.sx || {}, ...(Array.isArray(sx) ? sx : [sx])];

  const isLoading = loading || (finalDisableOnSubmitting && isSubmitting);

  const handleClick = async () => {
    // Botões que não precisam validar o form
    if (buttonType === 'reset') {
      if (keepDefaultValues) {
        formContext?.reset();
      } else {
        formContext?.reset({});
      }
      return;
    }

    if (buttonType === 'cancel') {
      onCancel?.();
      return;
    }

    if (buttonType === 'back') {
      onBack?.();
      return;
    }

    if (buttonType === 'delete') {
      if (confirmMessage) {
        const confirmed = window.confirm(confirmMessage);
        if (!confirmed) return;
      }
      await onDelete?.();
      // Delete também passa os dados do form (sem validar)
      if (formContext && onClick) {
        const formData = formContext.getValues();
        await onClick?.(formData);
      }
      return;
    }

    // Para todos os outros tipos, valida o form antes de chamar onClick
    if (formContext) {
      const isValid = await formContext.trigger(); // Valida todos os campos
      if (!isValid) return; // Se não for válido, não executa onClick
    }

    // Chama callbacks específicos
    if (buttonType === 'info') onInfo?.();
    if (buttonType === 'warning') onWarning?.();

    // Para todos os botões que validam, passa os dados do form como parâmetro
    if (formContext && onClick) {
      const formData = formContext.getValues();
      await onClick?.(formData);
    }
  };

  return (
    <Button
      type={finalHtmlType}
      variant={finalVariant}
      color={finalColor}
      disabled={disabled || isLoading}
      onClick={handleClick}
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
    </Button>
  );
}
