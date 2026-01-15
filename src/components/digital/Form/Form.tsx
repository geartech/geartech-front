'use client';

import { useForm, FormProvider, FieldValues, UseFormReturn } from 'react-hook-form';
import Box, { BoxProps } from '@mui/material/Box';
import { Grid, Paper } from '@mui/material';
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
import { FormSection } from './FormSection';

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
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
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
    alignItems = 'stretch',
    ...boxProps
  }: FormContainerProps<TFormValues>,
  ref: React.Ref<FormHandle<TFormValues>>
) {
  const methods = useForm<TFormValues>({
    defaultValues,
    mode,
    resolver,
  });

  React.useImperativeHandle(ref, () => ({
    getValues: methods.getValues,
    handleSubmit: methods.handleSubmit,
    reset: methods.reset,
    formState: methods.formState,
    watch: methods.watch,
  }));

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
      <Paper variant="outlined" elevation={1} sx={{ p: 1, pt: 1.5, mb: 1, borderRadius: 2 }}>
        <Box component="form" id={id} className={className} onSubmit={handleFormSubmit} noValidate {...boxProps}>
          <Grid container rowSpacing={3} columnSpacing={2} alignItems={alignItems} wrap="wrap">
            {children}
          </Grid>
        </Box>
      </Paper>
    </FormProvider>
  );
}

export const FormContainer = React.forwardRef(FormContainerComponent) as <T extends FieldValues = FieldValues>(
  props: FormContainerProps<T> & { form?: React.RefObject<FormHandle<T>> }
) => React.ReactElement;

const FormWrapper = React.forwardRef(function FormWrapper<TFormValues extends FieldValues = FieldValues>(
  props: FormContainerProps<TFormValues>,
  ref: React.Ref<FormHandle<TFormValues>>
) {
  const { ...restProps } = props;

  return <FormContainer ref={ref} {...restProps} />;
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
  Section: FormSection,
});
