'use client';
import * as React from 'react';
import { Paper, Box, Typography } from '@mui/material';

type PageLayoutComponent = React.FC<{ children: React.ReactNode }> & {
  Header: React.FC<{ title: string }>;
  Body: React.FC<{ children: React.ReactNode }>;
  Footer: React.FC<{ children: React.ReactNode }>;
};

const PageLayout: PageLayoutComponent = ({ children }) => {
  return (
    <Box
      sx={{
        borderRadius: 2,
        flex: 1,
        minHeight: 0,
        height: 'calc(100vh - 50px)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
        p: { xs: 1, sm: 1.5 },
        gap: 1,
      }}
    >
      {children}
    </Box>
  );
};

PageLayout.Header = function PageLayoutHeader({ title }: { title: string }) {
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

PageLayout.Body = function PageLayoutBody({ children }: { children: React.ReactNode }) {
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
    window.addEventListener('resize', updateShadow);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateShadow);
    };
  }, [updateShadow]);

  return (
    <Paper
      elevation={0}
      onScroll={updateShadow}
      ref={ref}
      sx={(theme) => ({
        borderRadius: 2,
        flex: 1,
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
        p: { xs: 1, sm: 1.5 },
        position: 'relative',
        // NÃO tocar em background/border/boxShadow -> herda do Header/tema
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
      {children}
    </Paper>
  );
};

PageLayout.Footer = function PageLayoutFooter({ children }: { children: React.ReactNode }) {
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

export default PageLayout;
