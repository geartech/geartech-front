'use client';

import Box, { BoxProps } from '@mui/material/Box';
import { ReactNode } from 'react';

export interface FormActionsProps extends BoxProps {
  children: ReactNode;
  align?: 'left' | 'center' | 'right' | 'space-between';
}

export function FormActions({
  children,
  align = 'right',
  ...boxProps
}: FormActionsProps) {
  const justifyContent = {
    left: 'flex-start',
    center: 'center',
    right: 'flex-end',
    'space-between': 'space-between',
  }[align];

  return (
    <Box
      display="flex"
      gap={2}
      justifyContent={justifyContent}
      mt={2}
      {...boxProps}
    >
      {children}
    </Box>
  );
}
