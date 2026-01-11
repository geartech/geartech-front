import type { ReactNode } from 'react';
import type {
  FieldValues,
  SubmitHandler,
  UseFormProps,
  Path,
  ControllerProps,
  FieldError,
  DefaultValues,
} from 'react-hook-form';
import type { BoxProps } from '@mui/material/Box';

/**
 * Props base para o componente Form container
 */
export interface FormProps<TFormValues extends FieldValues> extends Omit<UseFormProps<TFormValues>, 'defaultValues'> {
  defaultValues?: DefaultValues<TFormValues>;
  onSubmit?: SubmitHandler<TFormValues>;
  children: ReactNode;
  id?: string;
  className?: string;
}

/**
 * Props base para todos os campos de formulário
 */
export interface FormFieldBaseProps<TFormValues extends FieldValues> {
  name: Path<TFormValues>;
  label?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  rules?: ControllerProps<TFormValues>['rules'];
}

/**
 * Props para o container Form (equivalente ao FormContainer)
 * Combina FormProps com BoxProps da Material-UI
 */
export interface FormContainerProps<TFormValues extends FieldValues>
  extends FormProps<TFormValues>,
    Omit<BoxProps, 'onSubmit' | 'children'> {}

/**
 * Utilitário para extrair mensagem de erro do FieldError
 */
export function getErrorMessage(error: FieldError | undefined, label?: string): string | undefined {
  if (!error) return undefined;

  if (error.message) return error.message;

  if (error.type === 'required') {
    return label ? `${label} é obrigatório` : 'Campo obrigatório';
  }

  return 'Campo inválido';
}
