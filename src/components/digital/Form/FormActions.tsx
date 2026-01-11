'use client';

import Box, { BoxProps } from '@mui/material/Box';
import { ReactNode } from 'react';

export interface FormActionsProps extends BoxProps {
  children: ReactNode;
  variant?: 'form' | 'search';
  align?: 'left' | 'center' | 'right';
}

export function FormActions({ children, variant = 'form', align, sx, ...boxProps }: FormActionsProps) {
  // Determina alinhamento padrão baseado no variant
  const defaultAlign = variant === 'form' ? 'right' : 'left';
  const finalAlign = align ?? defaultAlign;

  return (
    <Box
      sx={{
        gridColumn: '1 / -1',
        display: 'flex',
        gap: 1,

        justifyContent: {
          xs: variant === 'search' ? 'flex-start' : 'stretch',
          sm: finalAlign === 'left' ? 'flex-start' : finalAlign === 'center' ? 'center' : 'flex-end',
        },

        '& > *': {
          flex: variant === 'form' ? { xs: 1, sm: 'unset' } : 'unset',
        },

        ...sx, // permite override manual
      }}
      {...boxProps}
    >
      {children}
    </Box>
  );
}
