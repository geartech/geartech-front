'use client';

import { Controller, useFormContext, FieldValues, FieldError } from 'react-hook-form';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { useTranslation } from 'react-i18next';
import { FormFieldBaseProps, getErrorMessage } from './types';
import { Grid, Skeleton } from '@mui/material';

export type FormInputProps<TFormValues extends FieldValues> = FormFieldBaseProps<TFormValues> &
  Omit<TextFieldProps, 'name' | 'error' | 'helperText' | 'value' | 'onChange' | 'onBlur'> & {
    maxLength?: number;
    loading?: boolean;
    baseSize?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    compact?: boolean;
  };

export function FormInput<TFormValues extends FieldValues>({
  name,
  label,
  helperText,
  required,
  disabled,
  rules,
  maxLength,
  loading,
  baseSize = 3,
  compact = false,
  sx,
  ...textFieldProps
}: FormInputProps<TFormValues>) {
  const { t } = useTranslation();
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

  if (loading) {
    return (
      <Grid size={compact ? 'auto' : toResponsiveSize(baseSize)}>
        <Skeleton
          variant="rounded"
          height={40}
          sx={{
            minWidth: compact ? '180px' : '12ch',
            width: compact ? '180px' : '100%',
          }}
        />
      </Grid>
    );
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
          <TextField
            {...textFieldProps}
            {...field}
            size="small"
            label={translatedLabel}
            placeholder={translatedPlaceholder}
            required={required}
            disabled={disabled}
            error={!!fieldError}
            helperText={errorMessage || helperText || ' '}
            FormHelperTextProps={{
              sx: { minHeight: '1.25em' },
            }}
            value={field.value ?? ''}
            inputProps={{
              maxLength,
              ...textFieldProps.inputProps,
            }}
            sx={{
              minWidth: compact ? '180px' : '12ch',
              width: compact ? '180px' : '100%',
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'inherit',
              },
              ...sx,
            }}
          />
        </Grid>
      )}
    />
  );
}
