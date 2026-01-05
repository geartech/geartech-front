'use client';

import { ComponentType } from 'react';
import { FieldValues } from 'react-hook-form';
import { FormContainer } from './Form';
import { FormInput, type FormInputProps } from './FormInput';
import { FormPassword, type FormPasswordProps } from './FormPassword';
import { FormSelect, type FormSelectProps } from './FormSelect';
import { FormCheckbox, type FormCheckboxProps } from './FormCheckbox';
import { FormSwitch, type FormSwitchProps } from './FormSwitch';
import { FormRadioGroup, type FormRadioGroupProps } from './FormRadioGroup';
import { FormDatePicker, type FormDatePickerProps } from './FormDatePicker';
import { FormDateTimePicker, type FormDateTimePickerProps } from './FormDateTimePicker';
import { FormTimePicker, type FormTimePickerProps } from './FormTimePicker';
import { FormButton, type FormButtonProps } from './FormButton';
import { FormActions, type FormActionsProps } from './FormActions';
import { type FormContainerProps } from './types';

/**
 * Componentes tipados retornados pelo factory createTypedForm
 * O tipo genérico TFormValues é herdado de todas as props dos componentes filhos
 */
export interface TypedFormComponents<TFormValues extends FieldValues> {
  Container: ComponentType<FormContainerProps<TFormValues>>;
  Input: ComponentType<FormInputProps<TFormValues>>;
  Password: ComponentType<FormPasswordProps<TFormValues>>;
  Select: ComponentType<FormSelectProps<TFormValues>>;
  Checkbox: ComponentType<FormCheckboxProps<TFormValues>>;
  Switch: ComponentType<FormSwitchProps<TFormValues>>;
  RadioGroup: ComponentType<FormRadioGroupProps<TFormValues>>;
  DatePicker: ComponentType<FormDatePickerProps<TFormValues>>;
  DateTimePicker: ComponentType<FormDateTimePickerProps<TFormValues>>;
  TimePicker: ComponentType<FormTimePickerProps<TFormValues>>;
  Button: ComponentType<FormButtonProps>;
  Actions: ComponentType<FormActionsProps>;
}

/**
 * Factory function para criar form components tipados
 *
 * @description
 * Cria um conjunto de componentes de formulário pré-tipados com um único tipo genérico.
 * Elimina a necessidade de repetir <TFormValues> em cada componente filho.
 *
 * @template TFormValues - O tipo da estrutura de dados do formulário
 * @returns {TypedFormComponents<TFormValues>} Objeto com componentes tipados
 *
 * @example
 * ```tsx
 * // 1. Definir interface do formulário
 * interface LoginFormData {
 *   email: string;
 *   password: string;
 *   rememberMe: boolean;
 * }
 *
 * // 2. Criar form tipado - GENÉRICO DECLARADO APENAS AQUI
 * const LoginForm = createTypedForm<LoginFormData>();
 *
 * // 3. Usar no componente - sem repetição de tipo
 * export function LoginPage() {
 *   return (
 *     <LoginForm.Container
 *       defaultValues={{ email: '', password: '', rememberMe: false }}
 *       onSubmit={handleLogin}
 *     >
 *       <LoginForm.Input
 *         name="email" // autocomplete funciona: "email" | "password" | "rememberMe"
 *         label="E-mail"
 *         type="email"
 *       />
 *       <LoginForm.Input
 *         name="password"
 *         label="Senha"
 *         type="password"
 *       />
 *       <LoginForm.Checkbox
 *         name="rememberMe"
 *         label="Lembrar-me"
 *       />
 *       <LoginForm.Button buttonType="submit">Entrar</LoginForm.Button>
 *     </LoginForm.Container>
 *   );
 * }
 * ```
 */
export function createTypedForm<TFormValues extends FieldValues>(): TypedFormComponents<TFormValues> {
  return {
    Container: FormContainer as ComponentType<FormContainerProps<TFormValues>>,
    Input: FormInput as ComponentType<FormInputProps<TFormValues>>,
    Password: FormPassword as ComponentType<FormPasswordProps<TFormValues>>,
    Select: FormSelect as ComponentType<FormSelectProps<TFormValues>>,
    Checkbox: FormCheckbox as ComponentType<FormCheckboxProps<TFormValues>>,
    Switch: FormSwitch as ComponentType<FormSwitchProps<TFormValues>>,
    RadioGroup: FormRadioGroup as ComponentType<FormRadioGroupProps<TFormValues>>,
    DatePicker: FormDatePicker as ComponentType<FormDatePickerProps<TFormValues>>,
    DateTimePicker: FormDateTimePicker as ComponentType<FormDateTimePickerProps<TFormValues>>,
    TimePicker: FormTimePicker as ComponentType<FormTimePickerProps<TFormValues>>,
    Button: FormButton,
    Actions: FormActions,
  };
}
