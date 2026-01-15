'use client';

import { useState } from 'react';
import { Controller, useFormContext, FieldValues, FieldError } from 'react-hook-form';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useTranslation } from 'react-i18next';
import { FormFieldBaseProps, getErrorMessage } from './types';
import { Grid } from '@mui/material';

export type FormPasswordProps<TFormValues extends FieldValues> = FormFieldBaseProps<TFormValues> &
  Omit<TextFieldProps, 'name' | 'error' | 'helperText' | 'value' | 'onChange' | 'onBlur' | 'type'> & {
    baseSize?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    compact?: boolean;
  };

export function FormPassword<TFormValues extends FieldValues>({
  name,
  label,
  helperText,
  required,
  disabled,
  rules,
  baseSize = 3,
  compact = false,
  ...textFieldProps
}: FormPasswordProps<TFormValues>) {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    formState: { errors },
  } = useFormContext<TFormValues>();

  const fieldError = errors[name] as FieldError | undefined;
  const errorMessage = getErrorMessage(fieldError, label);
  const translatedLabel = typeof label === 'string' ? t(label) : label;
  const translatedPlaceholder =
    typeof textFieldProps.placeholder === 'string' ? t(textFieldProps.placeholder) : textFieldProps.placeholder;

  function toResponsiveSize(base: number) {
    return {
      xs: 12,
      sm: Math.min(12, base * 2),
      md: Math.min(12, Math.ceil(base * 1.5)),
      lg: base,
    };
  }

  const handleToggleVisibility = () => {
    setShowPassword((prev) => !prev);
  };

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
          <TextField
            {...textFieldProps}
            {...field}
            size="small"
            type={showPassword ? 'text' : 'password'}
            label={translatedLabel}
            placeholder={translatedPlaceholder}
            required={required}
            disabled={disabled}
            error={!!fieldError}
            helperText={errorMessage || helperText}
            value={field.value ?? ''}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                    onClick={handleToggleVisibility}
                    edge="end"
                    disabled={disabled}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
              ...textFieldProps.InputProps,
            }}
            sx={{
              minWidth: compact ? '180px' : '12ch',
              width: compact ? '180px' : '100%',
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'inherit',
              },
            }}
          />
        </Grid>
      )}
    />
  );
}
