'use client';

import { Controller, useFormContext, FieldValues, FieldError } from 'react-hook-form';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { useTranslation } from 'react-i18next';
import { FormFieldBaseProps, getErrorMessage } from './types';

export type FormInputProps<TFormValues extends FieldValues> = FormFieldBaseProps<TFormValues> &
  Omit<TextFieldProps, 'name' | 'error' | 'helperText' | 'value' | 'onChange' | 'onBlur'> & {
    maxLength?: number;
  };

export function FormInput<TFormValues extends FieldValues>({
  name,
  label,
  helperText,
  required,
  disabled,
  rules,
  maxLength,
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

  // Calcula width inteligente baseado no maxLength
  const calculateWidth = (length?: number) => {
    if (!length) return undefined;

    // Aproximadamente 8px por caractere + padding/label space (~48px)
    const charWidth = 8;
    const baseWidth = 48;
    const calculatedWidth = (length * charWidth) + baseWidth;

    // Define limites mínimos e máximos
    const minWidth = 120; // Mínimo para usabilidade
    const maxWidth = 600; // Máximo para não ficar muito largo

    return Math.min(Math.max(calculatedWidth, minWidth), maxWidth);
  };

  const autoWidth = calculateWidth(maxLength);
  const shouldUseAutoWidth = maxLength && !textFieldProps.sx?.width && !textFieldProps.style?.width;

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
          fullWidth={!shouldUseAutoWidth}
          value={field.value ?? ''}
          inputProps={{ maxLength, ...textFieldProps.inputProps }}
          sx={{
            ...textFieldProps.sx,
            ...(shouldUseAutoWidth && {
              width: `${autoWidth}px`,
              maxWidth: '100%', // Mantém responsividade
              minWidth: '120px',
            }),
          }}
        />
      )}
    />
  );
}
