'use client';

import Box, { BoxProps } from '@mui/material/Box';
import { ReactNode } from 'react';

export interface FormActionsProps extends BoxProps {
  children: ReactNode;
  variant?: 'form' | 'search';
}

export function FormActions({ children, variant = 'form', ...boxProps }: FormActionsProps) {
  return (
    <Box
      sx={{
        gridColumn: '1 / -1',
        display: 'flex',
        gap: 1,

        justifyContent: {
          xs: variant === 'search' ? 'flex-start' : 'stretch',
          sm: 'flex-end',
        },

        '& > *': {
          flex: variant === 'form' ? { xs: 1, sm: 'unset' } : 'unset',
        },
      }}
      {...boxProps}
    >
      {children}
    </Box>
  );
}
