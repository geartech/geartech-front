'use client';

import { Controller, useFormContext, FieldValues, FieldError } from 'react-hook-form';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { FormFieldBaseProps, getErrorMessage } from './types';

export type FormInputProps<TFormValues extends FieldValues> = FormFieldBaseProps<TFormValues> &
  Omit<TextFieldProps, 'name' | 'error' | 'helperText' | 'value' | 'onChange' | 'onBlur'>;

export function FormInput<TFormValues extends FieldValues>({
  name,
  label,
  helperText,
  required,
  disabled,
  rules,
  ...textFieldProps
}: FormInputProps<TFormValues>) {
  const {
    control,
    formState: { errors },
  } = useFormContext<TFormValues>();

  const fieldError = errors[name] as FieldError | undefined;
  const errorMessage = getErrorMessage(fieldError, label);

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
          label={label}
          required={required}
          disabled={disabled}
          error={!!fieldError}
          helperText={errorMessage || helperText}
          fullWidth
          value={field.value ?? ''}
        />
      )}
    />
  );
}
