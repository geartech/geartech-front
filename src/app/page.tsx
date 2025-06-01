'use client';

import React from 'react';
import Form from '@/components/Form';
import { AuthService } from '@/api/services/AuthService';
import { AuthRequest } from '@/api/models/AuthRequest';

export default function Home() {
  // Função para lidar com o envio do formulário
  async function onLogin(data: AuthRequest) {
    try {
      const user = await AuthService.login(data);
      console.log('Usuário:', user);
    } catch (error) {
      // Lide com o erro, já pegando response do axios
      console.error('Erro ao buscar usuário:', error);
    }
  }

  return (
    <Form<AuthRequest> onSubmit={onLogin}>
      <Form.Input
        variant="filled"
        name="username"
        label="Usuário"
        placeholder="Digite seu usuário"
        required
      />
      <Form.Input
        variant="filled"
        name="password"
        label="Senha"
        type="password"
        required
      />

      <Form.Button
        type="submit"
        label="Entrar"
      />
    </Form>
  );
}
