'use client';

import { Card, CardProps } from '@mui/material';
import React from 'react';

type FilterProps = CardProps & {
  children: React.ReactNode;
};

export const Filter = React.forwardRef<HTMLDivElement, FilterProps>(({ children, sx, ...props }, ref) => (
  <Card
    ref={ref}
    sx={{
      borderRadius: 3,
      boxShadow: 1,
      p: 1,
      mb: 2,
      ...sx,
    }}
    {...props}
  >
    {children}
  </Card>
));

Filter.displayName = 'Filter';
