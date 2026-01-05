'use client';

import { useState } from 'react';
import { Controller, useFormContext, FieldValues, FieldError } from 'react-hook-form';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FormFieldBaseProps, getErrorMessage } from './types';

export type FormPasswordProps<TFormValues extends FieldValues> = FormFieldBaseProps<TFormValues> &
  Omit<TextFieldProps, 'name' | 'error' | 'helperText' | 'value' | 'onChange' | 'onBlur' | 'type'>;

export function FormPassword<TFormValues extends FieldValues>({
  name,
  label,
  helperText,
  required,
  disabled,
  rules,
  ...textFieldProps
}: FormPasswordProps<TFormValues>) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    formState: { errors },
  } = useFormContext<TFormValues>();

  const fieldError = errors[name] as FieldError | undefined;
  const errorMessage = getErrorMessage(fieldError, label);

  const handleToggleVisibility = () => {
    setShowPassword((prev) => !prev);
  };

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
          type={showPassword ? 'text' : 'password'}
          label={label}
          required={required}
          disabled={disabled}
          error={!!fieldError}
          helperText={errorMessage || helperText}
          fullWidth
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
        />
      )}
    />
  );
}
