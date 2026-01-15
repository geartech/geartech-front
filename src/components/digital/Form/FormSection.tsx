'use client';

import React from 'react';
import { Box, Grid, Typography, type SxProps, type Theme } from '@mui/material';
import { useTranslation } from 'react-i18next';

export interface FormSectionProps {
  /** Chave i18n da label da seção */
  title: string;
  hookup?: string;
  children: React.ReactNode;
  baseSize?: 4 | 6 | 8 | 12;
  layout?: 'grid' | 'column' | 'inline';
  compact?: boolean;
  sx?: SxProps<Theme>;
}

export const FormSection = React.forwardRef<HTMLFieldSetElement, FormSectionProps>((props, ref) => {
  const { title, children, baseSize = 12, layout = 'grid', compact = false, sx } = props;

  const { t } = useTranslation();

  function toResponsiveSize(base: number) {
    return {
      xs: 12,
      sm: Math.min(12, base * 2),
      md: Math.min(12, Math.ceil(base * 1.5)),
      lg: base,
    };
  }

  function renderContent() {
    if (layout === 'column') {
      return (
        <Grid container direction="column" rowSpacing={2}>
          {children}
        </Grid>
      );
    }

    if (layout === 'inline') {
      return (
        <Grid container wrap="nowrap" alignItems="center" columnSpacing={2}>
          {children}
        </Grid>
      );
    }

    // default: grid
    return (
      <Grid container columns={12} rowSpacing={2} columnSpacing={2}>
        {children}
      </Grid>
    );
  }

  return (
    <Grid size={compact ? 'auto' : toResponsiveSize(baseSize)}>
      <Box
        component="fieldset"
        ref={ref}
        sx={{
          border: 1,
          borderColor: 'divider',
          borderRadius: 1,
          p: 2,
          m: 0,
          minWidth: 0,
          width: '100%',
          ...sx,
        }}
      >
        <Typography
          component="legend"
          variant="subtitle2"
          sx={{
            px: 1,
            color: 'text.primary',
            bgcolor: 'inherit',
            fontWeight: 500,
          }}
        >
          {t(title)}
        </Typography>

        <Box sx={{ mt: 0.5 }}>{renderContent()}</Box>
      </Box>
    </Grid>
  );
});

FormSection.displayName = 'FormSection';
