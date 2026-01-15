// Main Form component with compound pattern
export { Form } from './Form';

// Individual components (para uso standalone se necessário)
export { FormInput, type FormInputProps } from './FormInput';
export { FormPassword, type FormPasswordProps } from './FormPassword';
export { FormSelect, type FormSelectProps, type SelectOption } from './FormSelect';
export { FormCheckbox, type FormCheckboxProps } from './FormCheckbox';
export { FormSwitch, type FormSwitchProps } from './FormSwitch';
export { FormRadioGroup, type FormRadioGroupProps, type RadioOption } from './FormRadioGroup';
export { FormDatePicker, type FormDatePickerProps } from './FormDatePicker';
export { FormDateTimePicker, type FormDateTimePickerProps } from './FormDateTimePicker';
export { FormTimePicker, type FormTimePickerProps } from './FormTimePicker';
export { FormActions, type FormActionsProps } from './FormActions';
export { FormSection, type FormSectionProps } from './FormSection';

// Button unificado
export { FormButton, type FormButtonProps, type FormButtonType, type FormButtonColor } from './FormButton';

// Types
export type { FormProps, FormFieldBaseProps, FormContainerProps } from './types';
export { getErrorMessage } from './types';

// Factory pattern para forms tipados com generics herdados
export { createTypedForm, type TypedFormComponents } from './createTypedForm';
