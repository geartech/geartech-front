'use client';

import { Controller, useFormContext, FieldValues, FieldError } from 'react-hook-form';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { FormFieldBaseProps, getErrorMessage } from './types';

export type FormDatePickerProps<TFormValues extends FieldValues> = FormFieldBaseProps<TFormValues> &
  Omit<DatePickerProps, 'value' | 'onChange'> & {
    fullWidth?: boolean;
  };

export function FormDatePicker<TFormValues extends FieldValues>({
  name,
  label,
  helperText,
  required,
  disabled,
  rules,
  fullWidth = true,
  ...datePickerProps
}: FormDatePickerProps<TFormValues>) {
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
        <DatePicker
          {...datePickerProps}
          label={label}
          value={field.value ?? null}
          onChange={(date) => field.onChange(date)}
          disabled={disabled}
          inputRef={field.ref}
          slotProps={{
            actionBar: {
              actions: ['today', 'clear'],
            },
            textField: {
              fullWidth,
              required,
              size: 'small',
              error: !!fieldError,
              helperText: errorMessage || helperText,
              onBlur: field.onBlur,
              variant: 'outlined',
              sx: {
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'inherit',
                },
              },
            },
            ...datePickerProps.slotProps,
          }}
        />
      )}
    />
  );
}
