'use client';

import { Controller, useFormContext, FieldValues, FieldError } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';
import FormHelperText from '@mui/material/FormHelperText';
import { useTranslation } from 'react-i18next';
import { FormFieldBaseProps, getErrorMessage } from './types';

export type FormSwitchProps<TFormValues extends FieldValues> = FormFieldBaseProps<TFormValues> &
  Omit<SwitchProps, 'name' | 'checked' | 'onChange' | 'onBlur'> & {
    labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
  };

export function FormSwitch<TFormValues extends FieldValues>({
  name,
  label,
  helperText,
  required,
  disabled,
  rules,
  labelPlacement = 'end',
  ...switchProps
}: FormSwitchProps<TFormValues>) {
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
      render={({ field }) => (
        <FormControl
          error={!!fieldError}
          disabled={disabled}
        >
          <FormControlLabel
            labelPlacement={labelPlacement}
            label={translatedLabel}
            control={
              <Switch
                {...switchProps}
                checked={!!field.value}
                onChange={(e) => field.onChange(e.target.checked)}
                onBlur={field.onBlur}
                inputRef={field.ref}
              />
            }
          />
          {(errorMessage || helperText) && <FormHelperText>{errorMessage || helperText}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}
