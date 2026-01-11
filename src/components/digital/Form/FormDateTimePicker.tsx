'use client';

import { Controller, useFormContext, FieldValues, FieldError } from 'react-hook-form';
import { DateTimePicker, DateTimePickerProps } from '@mui/x-date-pickers/DateTimePicker';
import { useTranslation } from 'react-i18next';
import { FormFieldBaseProps, getErrorMessage } from './types';
import { PICKER_WIDTHS } from './utils';

export type FormDateTimePickerProps<TFormValues extends FieldValues> = FormFieldBaseProps<TFormValues> &
  Omit<DateTimePickerProps, 'value' | 'onChange'> & {};

export function FormDateTimePicker<TFormValues extends FieldValues>({
  name,
  label,
  helperText,
  required,
  disabled,
  rules,
  slotProps: customSlotProps,
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
      render={({ field }) => {
        // Garante que value seja null ou um objeto Dayjs válido
        const isValidValue =
          field.value === null ||
          field.value === undefined ||
          (field.value && typeof field.value === 'object' && 'isValid' in field.value);
        const safeValue = isValidValue ? field.value ?? null : null;

        return (
          <DateTimePicker
            {...dateTimePickerProps}
            label={translatedLabel}
            ampm={false}
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
                  width: PICKER_WIDTHS.datetime,
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
