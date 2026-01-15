'use client';

import { Controller, useFormContext, FieldValues, FieldError } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import FormHelperText from '@mui/material/FormHelperText';
import { useTranslation } from 'react-i18next';
import { FormFieldBaseProps, getErrorMessage } from './types';

export type FormCheckboxProps<TFormValues extends FieldValues> = FormFieldBaseProps<TFormValues> &
  Omit<CheckboxProps, 'name' | 'checked' | 'onChange' | 'onBlur'>;

export function FormCheckbox<TFormValues extends FieldValues>({
  name,
  label,
  helperText,
  required,
  disabled,
  rules,
  ...checkboxProps
}: FormCheckboxProps<TFormValues>) {
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
      render={({ field }) => (
        <FormControl
          error={!!fieldError}
          disabled={disabled}
        >
          <FormControlLabel
            control={
              <Checkbox
                {...checkboxProps}
                checked={!!field.value}
                onChange={(e) => field.onChange(e.target.checked)}
                onBlur={field.onBlur}
                inputRef={field.ref}
              />
            }
            label={translatedLabel || ''}
          />
          {(errorMessage || helperText) && <FormHelperText>{errorMessage || helperText}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}
