'use client';

import { Controller, useFormContext, FieldValues, FieldError } from 'react-hook-form';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { useTranslation } from 'react-i18next';
import { FormFieldBaseProps, getErrorMessage } from './types';
import { Skeleton } from '@mui/material';
import { widthFromMaxLength } from './utils';

export type FormInputProps<TFormValues extends FieldValues> = FormFieldBaseProps<TFormValues> &
  Omit<TextFieldProps, 'name' | 'error' | 'helperText' | 'value' | 'onChange' | 'onBlur'> & {
    maxLength?: number;
    loading?: boolean;
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

  if (loading) {
    return (
      <Skeleton
        variant="rounded"
        height={40}
        sx={{
          width: widthFromMaxLength(maxLength),
          maxWidth: '100%',
        }}
      />
    );
  }

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: required ? `${label || 'Campo'} é obrigatório` : false,
        ...rules,
      }}
      render={({ field }) => (
        <TextField
          {...textFieldProps}
          {...field}
          size="small"
          label={translatedLabel}
          placeholder={translatedPlaceholder}
          required={required}
          disabled={disabled}
          error={!!fieldError}
          helperText={errorMessage || helperText}
          value={field.value ?? ''}
          inputProps={{
            maxLength,
            ...textFieldProps.inputProps,
          }}
          sx={{
            width: widthFromMaxLength(maxLength),
            maxWidth: '100%',
            ...sx, // permite override manual
          }}
        />
      )}
    />
  );
}
