'use client';

import { Controller, useFormContext, FieldValues, FieldError } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectProps } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import { useTranslation } from 'react-i18next';
import { FormFieldBaseProps, getErrorMessage } from './types';
import { Grid } from '@mui/material';

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export type FormSelectProps<TFormValues extends FieldValues> = FormFieldBaseProps<TFormValues> &
  Omit<SelectProps, 'name' | 'error' | 'value' | 'onChange' | 'onBlur'> & {
    options: SelectOption[];
    placeholder?: string;
    baseSize?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    compact?: boolean;
  };

export function FormSelect<TFormValues extends FieldValues>({
  name,
  label,
  helperText,
  required,
  disabled,
  rules,
  options,
  placeholder,
  baseSize = 3,
  compact = false,
  sx,
  ...selectProps
}: FormSelectProps<TFormValues>) {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
  } = useFormContext<TFormValues>();

  const fieldError = errors[name] as FieldError | undefined;
  const errorMessage = getErrorMessage(fieldError, label);
  const labelId = `${name}-label`;
  const translatedLabel = typeof label === 'string' ? t(label) : label;
  const translatedPlaceholder = typeof placeholder === 'string' ? t(placeholder) : placeholder;

  function toResponsiveSize(base: number) {
    return {
      xs: 12,
      sm: Math.min(12, base * 2),
      md: Math.min(12, Math.ceil(base * 1.5)),
      lg: base,
    };
  }

  const calculateWidth = () => {
    if (options.length > 0) {
      const maxLabelLength = Math.max(...options.map((opt) => opt.label.length));
      const MIN_CH = 12;
      const MAX_CH = 40;
      const ch = Math.min(Math.max(maxLabelLength * 0.8, MIN_CH), MAX_CH);
      return `${ch}ch`;
    }
    return undefined;
  };

  const autoWidth = calculateWidth();

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: required ? `${translatedLabel || 'Campo'} é obrigatório` : false,
        ...rules,
      }}
      render={({ field }) => (
        <Grid size={compact ? 'auto' : toResponsiveSize(baseSize)}>
          <FormControl
            error={!!fieldError}
            disabled={disabled}
            required={required}
            size="small" // ✅ CRÍTICO: size no FormControl
            sx={{
              minWidth: compact ? '180px' : '12ch',
              width: compact ? '180px' : autoWidth || '100%',
              ...sx,
            }}
          >
            {label && (
              <InputLabel
                id={labelId}
                size="small" // ✅ Label também precisa do size
              >
                {translatedLabel}
              </InputLabel>
            )}
            <Select
              {...selectProps}
              {...field}
              size="small"
              labelId={labelId}
              label={translatedLabel}
              value={field.value ?? ''}
              displayEmpty={!!translatedPlaceholder}
              renderValue={(selected) => {
                // ✅ Fix placeholder: mostra placeholder quando vazio
                if (!selected || selected === '') {
                  return <em style={{ color: 'rgba(128, 128, 128, 0.7)' }}>{translatedPlaceholder}</em>;
                }
                const option = options.find((opt) => opt.value === selected);
                return option?.label || String(selected);
              }}
            >
              {translatedPlaceholder && (
                <MenuItem value="" disabled>
                  <em>{translatedPlaceholder}</em>
                </MenuItem>
              )}
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value} disabled={option.disabled}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText sx={{ minHeight: '1.25em' }}>{errorMessage || helperText || ' '}</FormHelperText>
          </FormControl>
        </Grid>
      )}
    />
  );
}
