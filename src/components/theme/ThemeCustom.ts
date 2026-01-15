import { createTheme, ThemeOptions, PaletteMode, alpha } from '@mui/material/styles';

// =============================
// PALETA UX CORPORATIVA - BOTÕES
// =============================
const buttonColors = {
  submit: { main: '#1976D2', hover: '#1565C0', contrastText: '#fff' },
  success: { main: '#2E7D32', hover: '#1B5E20', contrastText: '#fff' },
  reset: { main: '#9E9E9E', hover: '#757575', contrastText: '#fff' },
  cancel: { main: '#6B7280', hover: '#4B5563', contrastText: '#fff' },
  back: { main: '#64748B', hover: '#475569', contrastText: '#fff' },
  info: { main: '#0288D1', hover: '#01579B', contrastText: '#fff' },
  warning: { main: '#ED6C02', hover: '#E65100', contrastText: '#fff' },
  delete: { main: '#D32F2F', hover: '#B71C1C', contrastText: '#fff' },
};

export default function ThemeCustom(mode: PaletteMode = 'light', options: ThemeOptions = {}) {
  const isDark = mode === 'dark';

  // =============================
  // Base colors
  // =============================
  const bgPage = isDark ? '#0b0f13' : '#f6f7fb';
  const bgPaper = isDark ? '#151a1f' : '#ffffff';

  const textPri = isDark ? '#e7eaf0' : '#111827';
  const textSec = isDark ? '#9aa4b2' : '#4b5563';

  const divider = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(17,24,39,0.12)';

  const inputBg = isDark ? '#171c21' : '#ffffff';

  const appBarBg = isDark ? '#0f1419' : '#e5e7eb';
  const drawerBg = isDark ? '#0d1216' : '#e2e8f0';

  const paperBorder = isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(2,6,23,0.05)';

  const paperShadow = isDark
    ? '0 2px 6px rgba(0,0,0,.22), 0 10px 28px rgba(0,0,0,.28)'
    : '0 4px 8px rgba(0,0,0,.04), 0 16px 32px rgba(0,0,0,.06)';

  // =============================
  // Scrollbar
  // =============================
  const scrollThumb = isDark ? '#566072' : '#94a3b8';
  const scrollThumbHover = isDark ? '#7b879c' : '#64748b';

  return createTheme({
    zIndex: {
      appBar: 1100,
      drawer: 1200,
      modal: 1300,
    },

    palette: {
      mode,
      background: {
        default: bgPage,
        paper: bgPaper,
      },
      text: {
        primary: textPri,
        secondary: textSec,
        disabled: alpha(textPri, 0.38),
      },
      divider,

      // Cores semânticas MUI (alinhadas com buttonColors)
      primary: {
        main: buttonColors.submit.main,
        dark: buttonColors.submit.hover,
        light: '#42A5F5',
        contrastText: '#fff',
      },
      secondary: {
        main: '#7C3AED',
        dark: '#5B21B6',
        light: '#A78BFA',
        contrastText: '#fff',
      },
      success: {
        main: buttonColors.success.main,
        dark: buttonColors.success.hover,
        light: '#4CAF50',
        contrastText: '#fff',
      },
      warning: {
        main: buttonColors.warning.main,
        dark: buttonColors.warning.hover,
        light: '#FF9800',
        contrastText: '#fff',
      },
      error: {
        main: buttonColors.delete.main,
        dark: buttonColors.delete.hover,
        light: '#EF5350',
        contrastText: '#fff',
      },
      info: {
        main: buttonColors.info.main,
        dark: buttonColors.info.hover,
        light: '#03A9F4',
        contrastText: '#fff',
      },

      // Custom colors para acesso direto no tema
      // @ts-expect-error - cores customizadas
      buttonColors,
    },

    shape: { borderRadius: 4 },

    components: {
      // =============================
      // CSS BASELINE
      // =============================
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarWidth: 'thin',
            scrollbarColor: `${scrollThumb} transparent`,
            '&::-webkit-scrollbar': { width: 8, height: 8 },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: scrollThumb,
              borderRadius: 8,
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: scrollThumbHover,
            },
          },
        },
      },

      // =============================
      // PAPER
      // =============================
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: bgPaper,
            backgroundImage: isDark
              ? 'linear-gradient(135deg, rgba(255,255,255,0.02), rgba(255,255,255,0))'
              : 'linear-gradient(135deg, rgba(2,6,23,0.015), rgba(2,6,23,0))',
            border: paperBorder,
            boxShadow: paperShadow,
          },
        },
      },

      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: appBarBg,
            borderBottom: `1px solid ${divider}`,
            color: textPri,
          },
        },
      },

      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: drawerBg,
            borderRight: `1px solid ${divider}`,
          },
        },
      },

      // =============================
      // INPUTS (GLOBAL)
      // =============================
      MuiInputBase: {
        styleOverrides: {
          root: {
            backgroundColor: inputBg,
          },
        },
      },

      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            backgroundColor: inputBg,

            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: isDark ? 'rgba(255,255,255,0.23)' : 'rgba(17,24,39,0.23)',
            },

            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: isDark ? 'rgba(255,255,255,0.38)' : 'rgba(17,24,39,0.38)',
            },

            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderWidth: 2,
              borderColor: buttonColors.submit.main,
            },
          },
          input: {
            '&:-webkit-autofill': {
              WebkitBoxShadow: `0 0 0 1000px ${inputBg} inset !important`,
              WebkitTextFillColor: `${textPri} !important`,
              caretColor: textPri,
              borderRadius: 'inherit',
              transition: 'background-color 5000s ease-in-out 0s',
            },
            '&:-webkit-autofill:hover, &:-webkit-autofill:focus': {
              WebkitBoxShadow: `0 0 0 1000px ${inputBg} inset !important`,
              WebkitTextFillColor: `${textPri} !important`,
            },
          },
        },
      },

      // =============================
      // BUTTONS - PALETA UX CORPORATIVA
      // =============================
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 400,
            fontSize: '0.95rem',
            borderRadius: 6,
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
            },
          },

          // PRIMARY (submit)
          containedPrimary: {
            backgroundColor: buttonColors.submit.main,
            '&:hover': {
              backgroundColor: buttonColors.submit.hover,
            },
          },

          // SUCCESS
          containedSuccess: {
            backgroundColor: buttonColors.success.main,
            '&:hover': {
              backgroundColor: buttonColors.success.hover,
            },
          },

          // WARNING
          containedWarning: {
            backgroundColor: buttonColors.warning.main,
            '&:hover': {
              backgroundColor: buttonColors.warning.hover,
            },
          },

          // ERROR (delete)
          containedError: {
            backgroundColor: buttonColors.delete.main,
            '&:hover': {
              backgroundColor: buttonColors.delete.hover,
            },
          },

          // INFO
          containedInfo: {
            backgroundColor: buttonColors.info.main,
            '&:hover': {
              backgroundColor: buttonColors.info.hover,
            },
          },

          // INHERIT (usado para reset, cancel, back)
          containedInherit: {
            backgroundColor: isDark ? '#374151' : '#E5E7EB',
            color: isDark ? '#E5E7EB' : '#374151',
            '&:hover': {
              backgroundColor: isDark ? '#4B5563' : '#D1D5DB',
            },
          },

          // OUTLINED variants
          outlinedPrimary: {
            borderColor: buttonColors.submit.main,
            color: buttonColors.submit.main,
            '&:hover': {
              backgroundColor: alpha(buttonColors.submit.main, 0.08),
              borderColor: buttonColors.submit.hover,
            },
          },

          outlinedInherit: {
            borderColor: isDark ? 'rgba(255,255,255,0.23)' : 'rgba(0,0,0,0.23)',
            color: textSec,
            '&:hover': {
              backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)',
            },
          },

          // TEXT variants
          textPrimary: {
            color: buttonColors.submit.main,
            '&:hover': {
              backgroundColor: alpha(buttonColors.submit.main, 0.08),
            },
          },

          textInherit: {
            color: textSec,
            '&:hover': {
              backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)',
            },
          },
        },
      },

      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: divider,
          },
        },
      },

      // =============================
      // FORM HELPER TEXT
      // =============================
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            '&.Mui-error': {
              color: isDark ? '#F87171' : buttonColors.delete.main, // vermelho mais claro no dark
              '&.Mui-required': {
                color: textSec, // ou 'inherit'
              },
            },
          },
        },
      },

      // =============================
      // CHIPS
      // =============================
      MuiChip: {
        styleOverrides: {
          colorPrimary: {
            backgroundColor: alpha(buttonColors.submit.main, isDark ? 0.2 : 0.12),
            color: isDark ? '#60A5FA' : buttonColors.submit.main,
          },
          colorSuccess: {
            backgroundColor: alpha(buttonColors.success.main, isDark ? 0.2 : 0.12),
            color: isDark ? '#4ADE80' : buttonColors.success.main,
          },
          colorWarning: {
            backgroundColor: alpha(buttonColors.warning.main, isDark ? 0.2 : 0.12),
            color: isDark ? '#FBBF24' : buttonColors.warning.main,
          },
          colorError: {
            backgroundColor: alpha(buttonColors.delete.main, isDark ? 0.2 : 0.12),
            color: isDark ? '#F87171' : buttonColors.delete.main,
          },
          colorInfo: {
            backgroundColor: alpha(buttonColors.info.main, isDark ? 0.2 : 0.12),
            color: isDark ? '#38BDF8' : buttonColors.info.main,
          },
        },
      },

      // =============================
      // ALERTS
      // =============================
      MuiAlert: {
        styleOverrides: {
          standardSuccess: {
            backgroundColor: alpha(buttonColors.success.main, isDark ? 0.15 : 0.1),
            color: isDark ? '#4ADE80' : buttonColors.success.main,
          },
          standardWarning: {
            backgroundColor: alpha(buttonColors.warning.main, isDark ? 0.15 : 0.1),
            color: isDark ? '#FBBF24' : buttonColors.warning.main,
          },
          standardError: {
            backgroundColor: alpha(buttonColors.delete.main, isDark ? 0.15 : 0.1),
            color: isDark ? '#F87171' : buttonColors.delete.main,
          },
          standardInfo: {
            backgroundColor: alpha(buttonColors.info.main, isDark ? 0.15 : 0.1),
            color: isDark ? '#38BDF8' : buttonColors.info.main,
          },
        },
      },
    },

    ...options,
  });
}

// =============================
// EXPORT BUTTON COLORS PARA USO NO COMPONENTE
// =============================
export { buttonColors };
