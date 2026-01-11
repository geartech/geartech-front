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
    fullWidth?: boolean;
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
  fullWidth = true,
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

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: required ? `${label || 'Campo'} é obrigatório` : false,
        ...rules,
      }}
      render={({ field }) => (
        <FormControl
          fullWidth={fullWidth}
          error={!!fieldError}
          disabled={disabled}
          required={required}
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
          {(errorMessage || helperText) && <FormHelperText>{errorMessage || helperText}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}
