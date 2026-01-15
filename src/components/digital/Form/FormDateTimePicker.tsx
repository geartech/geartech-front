'use client';

import { Controller, useFormContext, FieldValues, FieldError } from 'react-hook-form';

import { useTranslation } from 'react-i18next';
import { FormFieldBaseProps, getErrorMessage } from './types';
import { DesktopDateTimePicker, DesktopDateTimePickerProps } from '@mui/x-date-pickers';

export type FormDateTimePickerProps<TFormValues extends FieldValues> = FormFieldBaseProps<TFormValues> &
  Omit<DesktopDateTimePickerProps, 'value' | 'onChange'> & {};

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
        required: required ? `${translatedLabel || 'Campo'} é obrigatório` : false,
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
          <DesktopDateTimePicker
            {...dateTimePickerProps}
            label={translatedLabel}
            ampm={false}
            value={safeValue}
            closeOnSelect={true}
            onAccept={(date) => field.onChange(date)}
            onChange={(date) => field.onChange(date)}
            disabled={disabled}
            inputRef={field.ref}
            slotProps={{
              toolbar: {
                hidden: true, // ← Remove o toolbar "SELECIONE A DATA"
              },
              actionBar: {
                actions: ['today', 'clear'],
              },
              textField: {
                required,
                size: 'small',
                error: !!fieldError,
                helperText: errorMessage || helperText || ' ',
                onBlur: field.onBlur,
                variant: 'outlined',
                FormHelperTextProps: {
                  sx: { minHeight: '1.25em' }, // ← altura fixa
                },
                sx: {
                  minWidth: '20ch',
                  width: '26ch',
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
