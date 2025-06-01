import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';

type FormButtonProps = {
  label: string;
} & Omit<ButtonProps, 'children'>; // Permite passar outros props do MUI Button

const FormButton: React.FC<FormButtonProps> = ({ label, ...rest }) => (
  <Button
    variant="contained"
    fullWidth
    type="submit"
    {...rest}
  >
    {label}
  </Button>
);

export default FormButton;
