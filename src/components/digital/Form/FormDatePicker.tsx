'use client';

import { Controller, useFormContext, FieldValues, FieldError } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FormFieldBaseProps, getErrorMessage } from './types';
import { DesktopDatePicker, DesktopDatePickerProps } from '@mui/x-date-pickers';
import { Grid } from '@mui/material';

export type FormDatePickerProps<TFormValues extends FieldValues> = FormFieldBaseProps<TFormValues> &
  Omit<DesktopDatePickerProps, 'value' | 'onChange'> & {
    baseSize?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    compact?: boolean;
  };

export function FormDatePicker<TFormValues extends FieldValues>({
  name,
  label,
  helperText,
  required,
  disabled,
  rules,
  baseSize = 3,
  compact = false,
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
        const safeValue = field.value && typeof field.value === 'object' ? field.value : field.value ?? null;

        return (
          <Grid size={compact ? 'auto' : toResponsiveSize(baseSize)}>
            <DesktopDatePicker
              {...datePickerProps}
              label={translatedLabel}
              value={safeValue}
              closeOnSelect
              onChange={(date) => field.onChange(date)}
              onAccept={(date) => field.onChange(date)}
              disabled={disabled}
              inputRef={field.ref}
              slotProps={{
                toolbar: { hidden: true },
                actionBar: { actions: ['today', 'clear'] },
                textField: {
                  required,
                  size: 'small',
                  error: !!fieldError,
                  helperText: errorMessage || helperText || ' ',
                  onBlur: field.onBlur,
                  variant: 'outlined',
                  FormHelperTextProps: {
                    sx: { minHeight: '1.25em' },
                  },
                  sx: {
                    width: compact ? '180px' : '22ch',
                    minWidth: compact ? '180px' : '22ch',
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
