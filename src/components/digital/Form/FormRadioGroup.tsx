'use client';

import { Controller, useFormContext, FieldValues, FieldError } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup, { RadioGroupProps } from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import FormHelperText from '@mui/material/FormHelperText';
import { FormFieldBaseProps, getErrorMessage } from './types';

export interface RadioOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export type FormRadioGroupProps<TFormValues extends FieldValues> = FormFieldBaseProps<TFormValues> &
  Omit<RadioGroupProps, 'name' | 'value' | 'onChange' | 'onBlur'> & {
    options: RadioOption[];
  };

export function FormRadioGroup<TFormValues extends FieldValues>({
  name,
  label,
  helperText,
  required,
  disabled,
  rules,
  options,
  row,
  ...radioGroupProps
}: FormRadioGroupProps<TFormValues>) {
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
        <FormControl error={!!fieldError} disabled={disabled} required={required}>
          {label && <FormLabel>{label}</FormLabel>}
          <RadioGroup
            {...radioGroupProps}
            {...field}
            row={row}
            value={field.value ?? ''}
          >
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio />}
                label={option.label}
                disabled={option.disabled}
              />
            ))}
          </RadioGroup>
          {(errorMessage || helperText) && (
            <FormHelperText>{errorMessage || helperText}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}
