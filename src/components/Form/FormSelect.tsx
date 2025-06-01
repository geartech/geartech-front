import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText, SelectProps } from '@mui/material';

type Option = { label: string; value: string | number };

type Props = {
  name: string;
  label: string;
  options: Option[];
  required?: boolean;
} & Omit<SelectProps, 'name' | 'label' | 'required'>;

function FormSelect({ name, label, options, required, ...rest }: Props) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormControl
      fullWidth
      margin="normal"
      error={!!errors[name]}
    >
      <InputLabel>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        rules={{ required: required ? 'Campo obrigatório' : false }}
        render={({ field }) => (
          <Select
            {...field}
            label={label}
            required={required}
            {...rest}
          >
            {options.map((opt) => (
              <MenuItem
                key={opt.value}
                value={opt.value}
              >
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      <FormHelperText>{errors[name]?.message as string}</FormHelperText>
    </FormControl>
  );
}

export default FormSelect;
