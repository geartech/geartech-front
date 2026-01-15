'use client';

import { Controller, useFormContext, FieldValues, FieldError } from 'react-hook-form';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useTranslation } from 'react-i18next';
import { FormFieldBaseProps, getErrorMessage } from './types';

export type FormTimePickerProps<TFormValues extends FieldValues> = FormFieldBaseProps<TFormValues> & {
  slotProps?: Record<string, Record<string, unknown>>;
};

export function FormTimePicker<TFormValues extends FieldValues>({
  name,
  label,
  helperText,
  required,
  disabled,
  rules,
  slotProps: customSlotProps,
  ...timePickerProps
}: FormTimePickerProps<TFormValues>) {
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
          <TimePicker
            {...timePickerProps}
            ampm={false}
            views={['hours', 'minutes']}
            closeOnSelect={true}
            onAccept={(time) => field.onChange(time)}
            label={translatedLabel}
            value={safeValue}
            onChange={(time) => field.onChange(time)}
            disabled={disabled}
            inputRef={field.ref}
            slotProps={{
              toolbar: {
                hidden: true,
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
                  minWidth: '12ch',
                  width: '14ch',
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
