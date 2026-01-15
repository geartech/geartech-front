'use client';
import * as React from 'react';
import { Paper, Box, Typography } from '@mui/material';

type ViewRootProps = React.PropsWithChildren<{
  /** Quando estiver dentro do Drawer, use true */
  isDrawer?: boolean;
}>;

type ViewHeaderProps = { title: string | React.ReactNode; buttons?: React.ReactNode };
type ViewBodyProps = { children: React.ReactNode };
type ViewFooterProps = { children: React.ReactNode };

type ViewComponent = React.FC<ViewRootProps> & {
  Header: React.FC<ViewHeaderProps>;
  Body: React.FC<ViewBodyProps>;
  Footer: React.FC<ViewFooterProps>;
};

const View: ViewComponent = ({ children, isDrawer = false }: ViewRootProps) => {
  return (
    <Box
      sx={{
        borderRadius: 2,
        flex: 1,
        minHeight: 0,
        height: isDrawer ? `calc(100vh - 115px)` : `calc(100vh - 50px)`,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        p: isDrawer ? 0 : { xs: 0.5, sm: 1 },
        gap: 1,
      }}
    >
      {children}
    </Box>
  );
};

View.Header = function ViewHeader({ title, buttons }: ViewHeaderProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 2,
        width: '100%',
        p: 1,
        mb: 0,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <Typography variant="h5" component="h1" fontWeight={700}>
        {title}
      </Typography>
      {buttons && <Box sx={{ display: 'flex', gap: 1 }}>{buttons}</Box>}
    </Paper>
  );
};

View.Body = function ViewBody({ children }: ViewBodyProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = React.useState(true);
  const [atEnd, setAtEnd] = React.useState(true);

  const updateShadows = React.useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setAtStart(el.scrollTop <= 1);
    setAtEnd(el.scrollTop + el.clientHeight >= el.scrollHeight - 1);
  }, []);

  React.useLayoutEffect(() => {
    updateShadows();
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(updateShadows);
    ro.observe(el);
    el.addEventListener('scroll', updateShadows);
    window.addEventListener('resize', updateShadows);
    return () => {
      ro.disconnect();
      el.removeEventListener('scroll', updateShadows);
      window.removeEventListener('resize', updateShadows);
    };
  }, [updateShadows]);

  return (
    <Paper
      elevation={0}
      sx={(theme) => ({
        borderRadius: 2,
        flex: 1,
        minHeight: 0,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        // Sombra no TOP
        '&::before': {
          content: '""',
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: 24,
          borderTopLeftRadius: 'inherit',
          borderTopRightRadius: 'inherit',
          pointerEvents: 'none',
          zIndex: 1,
          opacity: atStart ? 0 : 1,
          transition: 'opacity .2s',
          background:
            theme.palette.mode === 'dark'
              ? 'linear-gradient(to top, rgba(0,0,0,0), rgba(0,0,0,.35))'
              : 'linear-gradient(to top, rgba(0,0,0,0), rgba(0,0,0,.18))',
        },
        // Sombra no BOTTOM
        '&::after': {
          content: '""',
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 24,
          borderBottomLeftRadius: 'inherit',
          borderBottomRightRadius: 'inherit',
          pointerEvents: 'none',
          zIndex: 1,
          opacity: atEnd ? 0 : 1,
          transition: 'opacity .2s',
          background:
            theme.palette.mode === 'dark'
              ? 'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,.35))'
              : 'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,.18))',
        },
      })}
    >
      <Box
        ref={ref}
        sx={{
          flex: 1,
          minHeight: 0,
          overflowY: 'auto',
          p: { xs: 0.2, sm: 0.5 },
          pb: { xs: 0.5, sm: 1 },
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </Box>
    </Paper>
  );
};

View.Footer = function ViewFooter({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        width: '100%',
        p: 1,
        textAlign: 'center',
      }}
    >
      {children}
    </Box>
  );
};

export default View;
