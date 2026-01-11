'use client';

import { useForm, FormProvider, FieldValues, UseFormReturn } from 'react-hook-form';
import Box, { BoxProps } from '@mui/material/Box';
import React from 'react';
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

export interface FormHandle<TFormValues extends FieldValues> {
  getValues: UseFormReturn<TFormValues>['getValues'];
  handleSubmit: UseFormReturn<TFormValues>['handleSubmit'];
  reset: UseFormReturn<TFormValues>['reset'];
  formState: UseFormReturn<TFormValues>['formState'];
  watch: UseFormReturn<TFormValues>['watch'];
}

interface FormContainerProps<TFormValues extends FieldValues>
  extends FormProps<TFormValues>,
    Omit<BoxProps, 'onSubmit' | 'children'> {
  form?: React.RefObject<FormHandle<TFormValues>>;
}

function FormContainerComponent<TFormValues extends FieldValues>(
  {
    defaultValues,
    onSubmit,
    children,
    mode = 'onSubmit',
    resolver,
    id,
    className,
    form,
    ...boxProps
  }: FormContainerProps<TFormValues>,
  ref: React.Ref<FormHandle<TFormValues>>
) {
  const methods = useForm<TFormValues>({
    defaultValues,
    mode,
    resolver,
  });

  // Expor métodos via ref usando useImperativeHandle
  React.useImperativeHandle(ref, () => ({
    getValues: methods.getValues,
    handleSubmit: methods.handleSubmit,
    reset: methods.reset,
    formState: methods.formState,
    watch: methods.watch,
  }));

  // Expor métodos via form prop também
  React.useEffect(() => {
    if (form?.current) {
      Object.assign(form.current, {
        getValues: methods.getValues,
        handleSubmit: methods.handleSubmit,
        reset: methods.reset,
        formState: methods.formState,
        watch: methods.watch,
      });
    }
  }, [form, methods]);

  const handleFormSubmit = onSubmit ? methods.handleSubmit(onSubmit) : (e: React.FormEvent) => e.preventDefault();

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        id={id}
        className={className}
        onSubmit={handleFormSubmit}
        noValidate
        {...boxProps}
      >
        {children}
      </Box>
    </FormProvider>
  );
}

export const FormContainer = React.forwardRef(FormContainerComponent) as <T extends FieldValues = FieldValues>(
  props: FormContainerProps<T> & { form?: React.RefObject<FormHandle<T>> }
) => React.ReactElement;

// Wrapper genérico para manter type arguments
const FormWrapper = React.forwardRef(function FormWrapper<TFormValues extends FieldValues = FieldValues>(
  props: FormContainerProps<TFormValues>,
  ref: React.Ref<FormHandle<TFormValues>>
) {
  return (
    <FormContainer
      {...props}
      form={ref as React.RefObject<FormHandle<TFormValues>>}
    />
  );
}) as <T extends FieldValues = FieldValues>(props: FormContainerProps<T>) => React.ReactElement;

// Compound Component Pattern
export const Form = Object.assign(FormWrapper, {
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
