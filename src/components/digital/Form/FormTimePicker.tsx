'use client';

import { Controller, useFormContext, FieldValues, FieldError } from 'react-hook-form';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useTranslation } from 'react-i18next';
import { FormFieldBaseProps, getErrorMessage } from './types';
import { Grid } from '@mui/material';

export type FormTimePickerProps<TFormValues extends FieldValues> = FormFieldBaseProps<TFormValues> & {
  slotProps?: Record<string, Record<string, unknown>>;
  baseSize?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  compact?: boolean;
};

export function FormTimePicker<TFormValues extends FieldValues>({
  name,
  label,
  helperText,
  required,
  disabled,
  rules,
  baseSize = 2,
  compact = false,
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

  function toResponsiveSize(base: number) {
    return {
      xs: 12,
      sm: Math.min(12, base * 2),
      md: Math.min(12, Math.ceil(base * 1.5)),
      lg: base,
    };
  }

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
          <Grid size={compact ? 'auto' : toResponsiveSize(baseSize)}>
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
                    minWidth: compact ? '180px' : '12ch',
                    width: compact ? '180px' : '14ch',
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'inherit',
                    },
                  },
                },
                ...customSlotProps,
              }}
            />
          </Grid>
        );
      }}
    />
  );
}
