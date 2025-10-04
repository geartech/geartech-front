import { TextField, TextFieldProps } from '@mui/material';

export default function FormInput(props: TextFieldProps) {
  return (
    <TextField
      size="small"
      fullWidth
      {...props}
    />
  );
}
