'use client';

import React from 'react';
import { FieldValues } from 'react-hook-form';
import { FormContainer } from './Form';
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
import { FormHandle } from './Form';
import { FormContainerProps } from './types';

/**
 * Componente Form genérico que permite usar <Form<T>> diretamente
 * sem precisar declarar const SearchForm = createTypedForm<SearchProjectRequest>()
 *
 * @example
 * ```tsx
 * <Form<SearchProjectRequest>
 *   ref={formRef}
 *   defaultValues={{...}}
 * >
 *   <Form.Input name="projectName" label="Nome" />
 *   <Form.DatePicker name="startDate" label="Data Início" />
 * </Form>
 * ```
 */
const FormGenericComponent = React.forwardRef(function FormGeneric<TFormValues extends FieldValues>(
  props: FormContainerProps<TFormValues>,
  ref: React.Ref<FormHandle<TFormValues>>
) {
  const { sx, ...restProps } = props;

  return (
    <FormContainer
      ref={ref}
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 1,
        alignItems: 'flex-end',
        justifyContent: 'start',
        ...sx,
      }}
      {...restProps}
    />
  );
}) as <T extends FieldValues = FieldValues>(
  props: FormContainerProps<T> & { ref?: React.Ref<FormHandle<T>> }
) => React.ReactElement;

export const Form = Object.assign(FormGenericComponent, {
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
