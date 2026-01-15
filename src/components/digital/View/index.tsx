'use client';
import * as React from 'react';
import { Paper, Box, Typography } from '@mui/material';

type ViewRootProps = React.PropsWithChildren<{
  /** Quando estiver dentro do Drawer, use true */
  isDrawer?: boolean;
}>;

type ViewHeaderProps = { title: string | React.ReactNode };
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
        p: isDrawer ? 0 : { xs: 1, sm: 1.5 },
        gap: 1,
      }}
    >
      {children}
    </Box>
  );
};

View.Header = function ViewHeader({ title }: { title: string | React.ReactNode }) {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 2,
        width: '100%',
        p: 1,
        mb: 0,
      }}
    >
      <Typography
        variant="h5"
        component="h1"
        fontWeight={700}
      >
        {title}
      </Typography>
    </Paper>
  );
};

View.Body = function ViewBody({ children }: ViewBodyProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [atEnd, setAtEnd] = React.useState(true);

  const updateShadow = React.useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setAtEnd(el.scrollTop + el.clientHeight >= el.scrollHeight - 1);
  }, []);

  React.useLayoutEffect(() => {
    updateShadow();
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(updateShadow);
    ro.observe(el);
    el.addEventListener('scroll', updateShadow);
    window.addEventListener('resize', updateShadow);
    return () => {
      ro.disconnect();
      el.removeEventListener('scroll', updateShadow);
      window.removeEventListener('resize', updateShadow);
    };
  }, [updateShadow]);

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
        overflow: 'hidden', // <- evita que o ::after role junto
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
          opacity: atEnd ? 0 : 1,
          transition: 'opacity .2s',
          background:
            theme.palette.mode === 'dark'
              ? 'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,.35))'
              : 'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,.18))',
        },
      })}
    >
      {/* Aqui é quem rola */}
      <Box
        ref={ref}
        sx={{
          flex: 1,
          minHeight: 0,
          overflowY: 'auto',
          p: { xs: 1, sm: 1.5 },
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

export { Filter } from './Filter';
export default View;
