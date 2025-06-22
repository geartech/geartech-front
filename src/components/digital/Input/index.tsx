import { TextField, TextFieldProps } from '@mui/material';

export default function Input(props: TextFieldProps) {
  return (
    <TextField
      size="small"
      fullWidth
      {...props}
    />
  );
}