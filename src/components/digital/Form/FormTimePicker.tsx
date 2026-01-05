'use client';

import { Controller, useFormContext, FieldValues, FieldError } from 'react-hook-form';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { FormFieldBaseProps, getErrorMessage } from './types';

export type FormTimePickerProps<TFormValues extends FieldValues> = FormFieldBaseProps<TFormValues> & {
  fullWidth?: boolean;
  slotProps?: Record<string, Record<string, unknown>>;
};

export function FormTimePicker<TFormValues extends FieldValues>({
  name,
  label,
  helperText,
  required,
  disabled,
  rules,
  fullWidth = true,
  slotProps: customSlotProps,
  ...timePickerProps
}: FormTimePickerProps<TFormValues>) {
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
        <TimePicker
          {...timePickerProps}
          label={label}
          value={field.value ?? null}
          onChange={(time) => field.onChange(time)}
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
            ...customSlotProps,
          }}
        />
      )}
    />
  );
}
