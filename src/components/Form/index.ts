import FormComponent from './Form';
import FormInput from './FormInput';
import FormSelect from './FormSelect';
import FormButton from './FormButton';

// “Compõe” o namespace
const Form = Object.assign(FormComponent, {
  Input: FormInput,
  Select: FormSelect,
  Button: FormButton,
});

export default Form;
