'use client';

import { Controller, useFormContext, FieldValues, FieldError } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectProps } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import { useTranslation } from 'react-i18next';
import { FormFieldBaseProps, getErrorMessage } from './types';

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export type FormSelectProps<TFormValues extends FieldValues> = FormFieldBaseProps<TFormValues> &
  Omit<SelectProps, 'name' | 'error' | 'value' | 'onChange' | 'onBlur'> & {
    options: SelectOption[];
    placeholder?: string;
    maxLength?: number;
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
  maxLength,
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

  // ✅ Calcula width inteligente baseado em maxLength OU nas opções
  const calculateWidth = () => {
    // Se maxLength fornecido, usa mesma lógica do Input
    if (maxLength) {
      const MIN_CH = 8;
      const MAX_CH = 40;
      const ch = Math.min(Math.max(maxLength * 0.8, MIN_CH), MAX_CH);
      return `${ch}ch`;
    }

    // Se não tem maxLength, calcula baseado na maior label das opções
    if (options.length > 0) {
      const maxLabelLength = Math.max(...options.map((opt) => opt.label.length));
      const MIN_CH = 12; // Select precisa espaço mínimo maior (label + ícone dropdown)
      const MAX_CH = 40;
      const ch = Math.min(Math.max(maxLabelLength * 0.8, MIN_CH), MAX_CH);
      return `${ch}ch`;
    }

    // Fallback: width natural do componente
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
        <FormControl
          error={!!fieldError}
          disabled={disabled}
          required={required}
          sx={{
            minWidth: '12ch', // Select precisa espaço mínimo (label + dropdown icon)
            width: autoWidth || '100%', // width específico ou flex
            ...sx, // permite override manual
          }}
        >
          {label && <InputLabel id={labelId}>{translatedLabel}</InputLabel>}
          <Select
            {...selectProps}
            {...field}
            size="small"
            labelId={labelId}
            label={translatedLabel}
            value={field.value ?? ''}
            displayEmpty={!!translatedPlaceholder}
          >
            {translatedPlaceholder && (
              <MenuItem
                value=""
                disabled
              >
                <em>{translatedPlaceholder}</em>
              </MenuItem>
            )}
            {options.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {(errorMessage || helperText || ' ') && (
            <FormHelperText sx={{ minHeight: '1.25em' }}>{errorMessage || helperText}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}
