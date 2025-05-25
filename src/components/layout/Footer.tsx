'use client';

import * as React from 'react';
import { Box } from '@mui/material';

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        height: 40,
        textAlign: 'center',
        bottom: 0,
        backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#121212' : '#dddddd'),
      }}
    >
      Sistema ©{new Date().getFullYear()} Desenvolvido por Você
    </Box>
  );
}
