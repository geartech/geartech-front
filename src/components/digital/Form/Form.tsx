'use client';

import { useForm, FormProvider, FieldValues } from 'react-hook-form';
import Box, { BoxProps } from '@mui/material/Box';
import { FormProps } from './types';
import { FormInput } from './FormInput';
import { FormPassword } from './FormPassword';
import { FormSelect } from './FormSelect';
import { FormCheckbox } from './FormCheckbox';
import { FormSwitch } from './FormSwitch';
import { FormRadioGroup } from './FormRadioGroup';
import { FormDatePicker } from './FormDatePicker';
import { FormDateTimePicker } from './FormDateTimePicker';
import { FormTimePicker } from './FormTimePicker';
import { FormButton } from './FormButton';
import { FormActions } from './FormActions';

interface FormContainerProps<TFormValues extends FieldValues>
  extends FormProps<TFormValues>,
    Omit<BoxProps, 'onSubmit' | 'children'> {}

export function FormContainer<TFormValues extends FieldValues>({
  defaultValues,
  onSubmit,
  children,
  mode = 'onSubmit',
  resolver,
  id,
  className,
  ...boxProps
}: FormContainerProps<TFormValues>) {
  const methods = useForm<TFormValues>({
    defaultValues,
    mode,
    resolver,
  });

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        id={id}
        className={className}
        onSubmit={methods.handleSubmit(onSubmit)}
        noValidate
        {...boxProps}
      >
        {children}
      </Box>
    </FormProvider>
  );
}

// Compound Component Pattern
export const Form = Object.assign(FormContainer, {
  Input: FormInput,
  Password: FormPassword,
  Select: FormSelect,
  Checkbox: FormCheckbox,
  Switch: FormSwitch,
  RadioGroup: FormRadioGroup,
  DatePicker: FormDatePicker,
  DateTimePicker: FormDateTimePicker,
  TimePicker: FormTimePicker,
  Button: FormButton,
  Actions: FormActions,
});
