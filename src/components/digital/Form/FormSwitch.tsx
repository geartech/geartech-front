'use client';

import { Controller, useFormContext, FieldValues, FieldError } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';
import FormHelperText from '@mui/material/FormHelperText';
import { useTranslation } from 'react-i18next';
import { FormFieldBaseProps, getErrorMessage } from './types';
import { Box, Grid } from '@mui/material';

export type FormSwitchProps<TFormValues extends FieldValues> = FormFieldBaseProps<TFormValues> &
  Omit<SwitchProps, 'name' | 'checked' | 'onChange' | 'onBlur'> & {
    labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
    baseSize?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    compact?: boolean;
  };

export function FormSwitch<TFormValues extends FieldValues>({
  name,
  label,
  helperText,
  required,
  disabled,
  rules,
  labelPlacement = 'end',
  baseSize = 3,
  compact = false,
  ...switchProps
}: FormSwitchProps<TFormValues>) {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
  } = useFormContext<TFormValues>();

  const fieldError = errors[name] as FieldError | undefined;
  const errorMessage = getErrorMessage(fieldError, label);
  const translatedLabel = typeof label === 'string' ? t(label) : label;

  function toResponsiveSize(base: number) {
    return {
      xs: 12,
      sm: Math.min(12, base * 2),
      md: Math.min(12, Math.ceil(base * 1.5)),
      lg: base,
    };
  }

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: required ? `${translatedLabel || 'Campo'} é obrigatório` : false,
        ...rules,
      }}
      render={({ field }) => (
        <Grid size={compact ? 'auto' : toResponsiveSize(baseSize)}>
          <FormControl
            error={!!fieldError}
            disabled={disabled}
            sx={{
              minWidth: compact ? '180px' : 'auto',
              width: compact ? '180px' : '100%',
            }}
          >
            {/* ✅ Box wrapper para alinhar verticalmente com inputs size="small" */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                minHeight: 40, // ✅ Mesma altura do TextField size="small"
              }}
            >
              <FormControlLabel
                labelPlacement={labelPlacement}
                label={translatedLabel}
                sx={{
                  margin: 0,
                  '& .MuiFormControlLabel-label': {
                    fontSize: '0.875rem',
                  },
                }}
                control={
                  <Switch
                    {...switchProps}
                    size="small" // ✅ Switch menor para melhor proporção
                    checked={!!field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    onBlur={field.onBlur}
                    inputRef={field.ref}
                  />
                }
              />
            </Box>
            {/* ✅ HelperText sempre presente para manter altura consistente */}
            <FormHelperText sx={{ minHeight: '1.25em' }}>{errorMessage || helperText || ' '}</FormHelperText>
          </FormControl>
        </Grid>
      )}
    />
  );
}
