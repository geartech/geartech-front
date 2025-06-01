'use client';

import Form from '@/components/Form';
import { useApiGet } from '@/hooks/useApiGet';
import { useApiMutation } from '@/hooks/useApiMutation';

type LoginDTO = {
  username: string;
  password: string;
  perfil: string;
};

export default function Home() {
  const { data, isLoading, error } = useApiGet('profile', '/user/me');
  const updateUser = useApiMutation('put', '/user/me');

  function onSubmit(data: LoginDTO) {
    console.log('Submit', data);
  }

  async function profile() {
    if (isLoading) return <div>Carregando...</div>;

    updateUser.mutateAsync({
      name: 'Leandro',
      email: 'leandro@email.com',
      roles: ['admin', 'user'],
    });
   
  }

  return (
    <Form<LoginDTO>
      defaultValues={{ username: '', password: '', perfil: '' }}
      onSubmit={onSubmit}
    >
      <Form.Input
        variant="filled"
        name="username"
        label="Usuário"
        placeholder="Digite seu usuário"
        required
        sx={{
          width: {
            xs: '100%', // Telas pequenas
            sm: 400, // >=600px
            md: 600, // >=900px
          },
        }}
      />
      <Form.Input
        variant="filled"
        name="password"
        label="Senha"
        type="password"
        required
      />

      <Form.Button
        label="Entrar"
        onClick={() => alert('teste')}
      />
    </Form>
  );
}
