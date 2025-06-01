import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import TextField, { TextFieldProps } from '@mui/material/TextField';

type Props = {
  name: string;
  label: string;
  variant?: 'filled' | 'outlined' | 'standard';
  required?: boolean;
} & Omit<TextFieldProps, 'name' | 'label' | 'required'>;

function FormInput({ name, label, required, variant, ...rest }: Props) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required ? 'Campo obrigatório' : false }}
      render={({ field }) => (
        <TextField
          {...field}
          variant={variant || 'outlined'}
          size="small"
          label={label}
          required={required}
          error={!!errors[name]}
          helperText={errors[name]?.message as string}
          margin="normal"
          {...rest}
        />
      )}
    />
  );
}

export default FormInput;
