'use client';

import { Controller, useFormContext, FieldValues, FieldError } from 'react-hook-form';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { useTranslation } from 'react-i18next';
import { FormFieldBaseProps, getErrorMessage } from './types';
import { Box, Skeleton } from '@mui/material';

export type FormInputProps<TFormValues extends FieldValues> = FormFieldBaseProps<TFormValues> &
  Omit<TextFieldProps, 'name' | 'error' | 'helperText' | 'value' | 'onChange' | 'onBlur'> & {
    maxLength?: number;
    loading?: boolean;
  };

const InputSlot = ({ children }: { children: React.ReactNode }) => <Box sx={{ flex: 1, minWidth: 0 }}>{children}</Box>;

export function FormInput<TFormValues extends FieldValues>({
  name,
  label,
  helperText,
  required,
  disabled,
  rules,
  maxLength,
  loading,
  ...textFieldProps
}: FormInputProps<TFormValues>) {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
  } = useFormContext<TFormValues>();

  const fieldError = errors[name] as FieldError | undefined;
  const errorMessage = getErrorMessage(fieldError, label);

  const translatedLabel = typeof label === 'string' ? t(label) : label;
  const translatedPlaceholder =
    typeof textFieldProps.placeholder === 'string' ? t(textFieldProps.placeholder) : textFieldProps.placeholder;

  // ---- Auto width seguro ----
  const calculateWidth = (length?: number) => {
    if (!length) return undefined;

    const charWidth = 6.2; // realista para MUI small
    const baseWidth = 32; // padding + label gap

    const minWidth = 96; // compacto
    const maxWidth = 800; // evita exagero

    return Math.min(Math.max(length * charWidth + baseWidth, minWidth), maxWidth);
  };

  const autoWidth = calculateWidth(maxLength);

  // Só considera width imperativo (style), nunca sx
  const hasInlineWidth = Boolean(textFieldProps.style?.width);
  const shouldUseAutoWidth = Boolean(maxLength && !hasInlineWidth);

  if (loading) {
    return (
      <InputSlot>
        <Skeleton
          variant="rounded"
          height={40}
          sx={{
            width: shouldUseAutoWidth ? autoWidth : '100%',
            minWidth: shouldUseAutoWidth ? 96 : undefined,
          }}
        />
      </InputSlot>
    );
  }

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: required ? `${label || 'Campo'} é obrigatório` : false,
        ...rules,
      }}
      render={({ field }) => (
        <InputSlot>
          <TextField
            {...textFieldProps}
            {...field}
            fullWidth
            size="small"
            label={translatedLabel}
            placeholder={translatedPlaceholder}
            required={required}
            disabled={disabled}
            error={!!fieldError}
            helperText={errorMessage || helperText}
            value={field.value ?? ''}
            inputProps={{
              maxLength,
              ...textFieldProps.inputProps,
            }}
            sx={{
              ...textFieldProps.sx,
              ...(shouldUseAutoWidth && {
                width: '100%',
              }),
            }}
          />
        </InputSlot>
      )}
    />
  );
}
