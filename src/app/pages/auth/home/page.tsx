'use client';

import { createTypedForm } from '@/components/digital/Form';
import View from '@/components/digital/View';
import { Box, Divider, Stack } from '@mui/material';

const { Header, Body } = View;

interface UserFormData {
  name: string;
  email: string;
  password: string;
  role: string;
  department: string;
  active: boolean;
  notifications: boolean;
  birthDate: Date | null;
  startDateTime: Date | null;
  startTime: Date | null;
}

export default function Home() {
  const UserForm = createTypedForm<UserFormData>();

  const defaultValues: UserFormData = {
    name: '',
    email: '',
    password: '',
    role: '',
    department: '',
    active: true,
    notifications: false,
    birthDate: null,
    startDateTime: null,
    startTime: null,
  };

  return (
    <View>
      <Header title="Home" />
      <Body>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px' }}>HOME</Box>
        <UserForm.Container
          defaultValues={defaultValues}
          onSubmit={() => console.log()}
        >
          <Stack spacing={3}>
            <UserForm.Input
              name="name"
              label="Nome completo"
              placeholder="João da Silva"
              required
              autoFocus
            />
            <UserForm.DatePicker
              name="birthDate"
              label="Data de nascimento"
            />
            <UserForm.DateTimePicker
              name="startDateTime"
              label="Data e Hora"
            />
            <UserForm.TimePicker
              name="startTime"
              label="Hora"
            />
            <Divider sx={{ my: 2 }} />

            <UserForm.Actions align="right">
              <UserForm.Button buttonType="submit">Submit</UserForm.Button>
              <UserForm.Button buttonType="reset">reset</UserForm.Button>
              <UserForm.Button buttonType="info">Info</UserForm.Button>
              <UserForm.Button buttonType="success">Success</UserForm.Button>
              <UserForm.Button buttonType="back">Back</UserForm.Button>
              <UserForm.Button buttonType="cancel">Cancel</UserForm.Button>
              <UserForm.Button buttonType="warning">Warning</UserForm.Button>
              <UserForm.Button buttonType="delete">Delete</UserForm.Button>
            </UserForm.Actions>
          </Stack>
        </UserForm.Container>
      </Body>
    </View>
  );
}
