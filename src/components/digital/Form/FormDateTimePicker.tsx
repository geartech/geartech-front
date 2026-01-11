'use client';

import { Controller, useFormContext, FieldValues, FieldError } from 'react-hook-form';
import { DateTimePicker, DateTimePickerProps } from '@mui/x-date-pickers/DateTimePicker';
import { useTranslation } from 'react-i18next';
import { FormFieldBaseProps, getErrorMessage } from './types';

export type FormDateTimePickerProps<TFormValues extends FieldValues> = FormFieldBaseProps<TFormValues> &
  Omit<DateTimePickerProps, 'value' | 'onChange'> & {};

export function FormDateTimePicker<TFormValues extends FieldValues>({
  name,
  label,
  helperText,
  required,
  disabled,
  rules,
  ...dateTimePickerProps
}: FormDateTimePickerProps<TFormValues>) {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
  } = useFormContext<TFormValues>();

  const fieldError = errors[name] as FieldError | undefined;
  const errorMessage = getErrorMessage(fieldError, label);
  const translatedLabel = typeof label === 'string' ? t(label) : label;

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
          label={translatedLabel}
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
              fullWidth: true,
              required,
              size: 'small',
              error: !!fieldError,
              helperText: errorMessage || helperText,
              onBlur: field.onBlur,
              variant: 'outlined',
              sx: {
                width: '100%',
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
