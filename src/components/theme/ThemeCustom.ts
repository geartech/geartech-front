import { createTheme, ThemeOptions, PaletteMode, alpha } from '@mui/material/styles';

export default function ThemeCustom(mode: PaletteMode = 'light', options: ThemeOptions = {}) {
  const isDark = mode === 'dark';

  // Fundo levemente mais escuro no light
  const bgPage = isDark ? '#0b0f13' : '#f3f5f9';
  const bgPaper = isDark ? '#151a1f' : '#ffffff';
  const textPri = isDark ? '#e7eaf0' : '#0b1220';
  const textSec = isDark ? '#9aa4b2' : '#465063';
  const divider = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(2,6,23,0.08)';
  const inputBg = isDark ? '#0e1318' : '#ffffff';
  const appBarBg = isDark ? '#0f1419' : '#ffffff';
  const drawerBg = isDark ? '#0d1216' : '#ffffff';

  // Scrollbar
  const scrollThumb = isDark ? '#566072' : '#94a3b8';
  const scrollThumbHover = isDark ? '#7b879c' : '#64748b';
  const scrollTrack = 'transparent';

  // Borda + sombra refinadas
  const paperBorder = isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(2,6,23,0.05)';
  const paperShadow = isDark
    ? '0 2px 6px rgba(0,0,0,.22), 0 10px 28px rgba(0,0,0,.28)'
    : '0 4px 8px rgba(0,0,0,.04), 0 16px 32px rgba(0,0,0,.06)';

  return createTheme({
    palette: {
      mode,
      background: { default: bgPage, paper: bgPaper },
      text: { primary: textPri, secondary: textSec, disabled: alpha(textPri, 0.38) },
      divider,
      primary: { main: '#7dd3fc', dark: '#38bdf8', light: '#b3e7fe', contrastText: isDark ? '#0b0f13' : '#001018' },
      secondary: { main: '#a78bfa', dark: '#8b5cf6', light: '#c7b9ff', contrastText: isDark ? '#0b0f13' : '#1a1030' },
      success: { main: '#16a34a' },
      warning: { main: '#f59e0b' },
      error: { main: '#ef4444' },
    },

    shape: { borderRadius: 2 },

    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarWidth: 'thin',
            scrollbarColor: `${scrollThumb} ${scrollTrack}`,
            '&::-webkit-scrollbar': { width: 8, height: 8 },
            '&::-webkit-scrollbar-track': { background: scrollTrack },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: scrollThumb,
              borderRadius: 8,
              border: '2px solid transparent',
              backgroundClip: 'content-box',
            },
            '&::-webkit-scrollbar-thumb:hover': { backgroundColor: scrollThumbHover },
          },
          '.scrollbar': {
            scrollbarWidth: 'thin',
            scrollbarColor: `${scrollThumb} ${scrollTrack}`,
            '&::-webkit-scrollbar': { width: 8, height: 8 },
            '&::-webkit-scrollbar-track': { background: scrollTrack },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: scrollThumb,
              borderRadius: 8,
              border: '2px solid transparent',
              backgroundClip: 'content-box',
            },
            '&::-webkit-scrollbar-thumb:hover': { backgroundColor: scrollThumbHover },
          },
        },
      },

      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: bgPaper,
            backgroundImage: isDark
              ? 'linear-gradient(135deg, rgba(255,255,255,0.02), rgba(255,255,255,0.00))'
              : 'linear-gradient(135deg, rgba(2,6,23,0.015), rgba(2,6,23,0.00))',
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
            boxShadow: isDark ? undefined : '0 1px 10px rgba(2,6,23,0.1)', // sombra mais sutil no light
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: { backgroundColor: drawerBg, borderRight: `1px solid ${divider}` },
        },
      },

      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 4,
          },
        },
      },

      MuiButton: {
        styleOverrides: {
          contained: {
            boxShadow: 'none',
            '&:hover': { boxShadow: 'none', filter: 'brightness(0.96)' },
            '&:active': { filter: 'brightness(0.92)' },
          },
          outlined: {
            borderColor: alpha(textPri, isDark ? 0.14 : 0.2),
            '&:hover': {
              borderColor: alpha(textPri, isDark ? 0.24 : 0.3),
              backgroundColor: alpha(textPri, 0.04),
            },
          },
        },
      },

      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            backgroundColor: inputBg,
            '& .MuiOutlinedInput-notchedOutline': { borderColor: alpha(textPri, isDark ? 0.08 : 0.12) },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: alpha(textPri, isDark ? 0.16 : 0.2) },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#7dd3fc' },
          },
          input: {
            '&:-webkit-autofill': {
              WebkitBoxShadow: `0 0 0 1000px ${inputBg} inset`,
              WebkitTextFillColor: textPri,
            },
          },
        },
      },

      MuiListItemButton: {
        styleOverrides: {
          root: {
            '&.Mui-selected': { backgroundColor: alpha('#7dd3fc', 0.16) },
            '&:hover': { backgroundColor: alpha(textPri, 0.06) },
          },
        },
      },

      MuiDivider: { styleOverrides: { root: { borderColor: divider } } },
    },

    ...options,
  });
}
