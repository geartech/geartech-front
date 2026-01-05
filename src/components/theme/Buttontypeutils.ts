import { ButtonProps } from '@mui/material/Button';
import { buttonColors } from './ThemeCustom';

type ButtonType = 'submit' | 'success' | 'reset' | 'cancel' | 'back' | 'info' | 'warning' | 'delete';

interface ButtonTypeConfig {
  color: ButtonProps['color'];
  variant: ButtonProps['variant'];
  sx?: ButtonProps['sx'];
}

/**
 * Mapeia buttonType customizado para props do MUI Button
 * Paleta UX corporativa:
 * - submit:  Azul primário (#1976D2) - Ação principal
 * - success: Verde (#2E7D32) - Confirmação positiva
 * - reset:   Cinza médio (#9E9E9E) - Limpar formulário
 * - cancel:  Cinza escuro (#6B7280) - Cancelar fluxo
 * - back:    Cinza outline (#64748B) - Navegação
 * - info:    Azul claro (#0288D1) - Informativo
 * - warning: Âmbar (#ED6C02) - Atenção/risco
 * - delete:  Vermelho (#D32F2F) - Ação destrutiva
 */
export function getButtonTypeProps(buttonType: ButtonType): ButtonTypeConfig {
  const configs: Record<ButtonType, ButtonTypeConfig> = {
    submit: {
      color: 'primary',
      variant: 'contained',
    },
    success: {
      color: 'success',
      variant: 'contained',
    },
    reset: {
      color: 'inherit',
      variant: 'outlined',
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
      sx: {
        borderColor: buttonColors.cancel.main,
        color: buttonColors.cancel.main,
        '&:hover': {
          borderColor: buttonColors.cancel.hover,
          backgroundColor: 'rgba(107, 114, 128, 0.08)',
        },
      },
    },
    back: {
      color: 'inherit',
      variant: 'outlined',
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
    },
    warning: {
      color: 'warning',
      variant: 'contained',
    },
    delete: {
      color: 'error',
      variant: 'contained',
    },
  };

  return configs[buttonType] || configs.submit;
}

/**
 * Cores exportadas para uso direto se necessário
 */
export { buttonColors };
