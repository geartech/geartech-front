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
          value={field.value ?? ''} // nunca undefined!
          required={required}
          error={!!errors[name]}
          helperText={errors[name]?.message as string}
          margin="normal"
          slotProps={{
            inputLabel: {
              shrink: true,
              style: {
                color: '#000', // Cor do label
                fontWeight: 'normal', // Negrito
                fontSize: 14, // Tamanho da fonte
                letterSpacing: 1, // Espaçamento entre letras
              },
            },
          }}
          {...rest}
        />
      )}
    />
  );
}

export default FormInput;
