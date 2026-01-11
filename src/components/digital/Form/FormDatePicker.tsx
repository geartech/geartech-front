'use client';

import { Controller, useFormContext, FieldValues, FieldError } from 'react-hook-form';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { useTranslation } from 'react-i18next';
import { FormFieldBaseProps, getErrorMessage } from './types';
import { PICKER_WIDTHS } from './utils';

export type FormDatePickerProps<TFormValues extends FieldValues> = FormFieldBaseProps<TFormValues> &
  Omit<DatePickerProps, 'value' | 'onChange'> & {};

export function FormDatePicker<TFormValues extends FieldValues>({
  name,
  label,
  helperText,
  required,
  disabled,
  rules,
  slotProps: customSlotProps,
  ...datePickerProps
}: FormDatePickerProps<TFormValues>) {
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
      render={({ field }) => {
        // Garante que value seja null ou um objeto Dayjs válido
        const isValidValue =
          field.value === null ||
          field.value === undefined ||
          (field.value && typeof field.value === 'object' && 'isValid' in field.value);
        const safeValue = isValidValue ? field.value ?? null : null;

        return (
          <DatePicker
            {...datePickerProps}
            label={translatedLabel}
            value={safeValue}
            onChange={(date) => field.onChange(date)}
            disabled={disabled}
            inputRef={field.ref}
            slotProps={{
              actionBar: {
                actions: ['today', 'clear'],
              },
              textField: {
                required,
                size: 'small',
                error: !!fieldError,
                helperText: errorMessage || helperText,
                onBlur: field.onBlur,
                variant: 'outlined',
                sx: {
                  width: PICKER_WIDTHS.date,
                  maxWidth: '100%',
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'inherit',
                  },
                },
              },
              ...customSlotProps,
            }}
          />
        );
      }}
    />
  );
}
