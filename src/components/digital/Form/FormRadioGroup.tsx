'use client';

import { Controller, useFormContext, FieldValues, FieldError } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup, { RadioGroupProps } from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import FormHelperText from '@mui/material/FormHelperText';
import { useTranslation } from 'react-i18next';
import { FormFieldBaseProps, getErrorMessage } from './types';
import { Grid } from '@mui/material';

export interface RadioOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export type FormRadioGroupProps<TFormValues extends FieldValues> = FormFieldBaseProps<TFormValues> &
  Omit<RadioGroupProps, 'name' | 'value' | 'onChange' | 'onBlur'> & {
    options: RadioOption[];
    baseSize?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    compact?: boolean;
  };

export function FormRadioGroup<TFormValues extends FieldValues>({
  name,
  label,
  helperText,
  required,
  disabled,
  rules,
  options,
  baseSize = 3,
  compact = false,
  row,
  ...radioGroupProps
}: FormRadioGroupProps<TFormValues>) {
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
      render={({ field }) => (
        <Grid size={compact ? 'auto' : toResponsiveSize(baseSize)}>
          <FormControl
            error={!!fieldError}
            disabled={disabled}
            required={required}
            sx={{
              minWidth: compact ? '180px' : 'auto',
              width: compact ? '180px' : '100%',
            }}
          >
            {label && <FormLabel>{translatedLabel}</FormLabel>}
            <RadioGroup {...radioGroupProps} {...field} row={row} value={field.value ?? ''}>
              {options.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio />}
                  label={option.label}
                  disabled={option.disabled}
                />
              ))}
            </RadioGroup>
            {(errorMessage || helperText) && <FormHelperText>{errorMessage || helperText}</FormHelperText>}
          </FormControl>
        </Grid>
      )}
    />
  );
}
