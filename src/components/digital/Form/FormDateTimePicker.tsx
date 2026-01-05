'use client';

import { Controller, useFormContext, FieldValues, FieldError } from 'react-hook-form';
import { DateTimePicker, DateTimePickerProps } from '@mui/x-date-pickers/DateTimePicker';
import { FormFieldBaseProps, getErrorMessage } from './types';

export type FormDateTimePickerProps<TFormValues extends FieldValues> = FormFieldBaseProps<TFormValues> &
  Omit<DateTimePickerProps, 'value' | 'onChange'> & {
    fullWidth?: boolean;
  };

export function FormDateTimePicker<TFormValues extends FieldValues>({
  name,
  label,
  helperText,
  required,
  disabled,
  rules,
  fullWidth = true,
  ...dateTimePickerProps
}: FormDateTimePickerProps<TFormValues>) {
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
        <DateTimePicker
          {...dateTimePickerProps}
          label={label}
          ampm={false}
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
            ...dateTimePickerProps.slotProps,
          }}
        />
      )}
    />
  );
}
