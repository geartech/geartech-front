'use client';

import { createTypedForm } from './index';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';

// ============================================================================
// EXEMPLO 1: Form de Usuário com múltiplos campos
// ============================================================================

/**
 * Interface tipada para o formulário de usuário
 * Declare o tipo uma única vez - será herdado em todos os componentes filhos
 */
interface UserFormData {
  name: string;
  email: string;
  password: string;
  role: string;
  department: string;
  active: boolean;
  notifications: boolean;
  birthDate: Date | null;
}

/**
 * Factory com type herdado - GENÉRICO DECLARADO APENAS UMA VEZ
 * Todos os componentes filhos usarão automaticamente as keys de UserFormData
 */
const UserForm = createTypedForm<UserFormData>();

export function UserFormExample() {
  const defaultValues: UserFormData = {
    name: '',
    email: '',
    password: '',
    role: '',
    department: '',
    active: true,
    notifications: false,
    birthDate: null,
  };

  const handleSubmit = async (data: UserFormData) => {
    console.log('Form data:', data);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    alert('Usuário criado com sucesso!');
  };

  return (
    <Paper
      elevation={3}
      sx={{ p: 4, maxWidth: 600, mx: 'auto' }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{ mb: 3, fontWeight: 600 }}
      >
        Cadastro de Usuário
      </Typography>

      <UserForm.Container
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
      >
        <Stack spacing={3}>
          {/* ✨ Sem necessidade de <UserFormData> - tipagem herdada automaticamente! */}
          <UserForm.Input
            name="name" // ✅ autocomplete: "name" | "email" | "password" | "role" | "department" | "active" | "notifications" | "birthDate"
            label="Nome completo"
            placeholder="João da Silva"
            required
            autoFocus
          />

          <UserForm.Input
            name="email"
            label="E-mail"
            type="email"
            placeholder="joao@example.com"
            required
            rules={{
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'E-mail inválido',
              },
            }}
          />

          <UserForm.Password
            name="password"
            label="Senha"
            required
            rules={{
              minLength: {
                value: 8,
                message: 'Senha deve ter no mínimo 8 caracteres',
              },
            }}
          />

          <UserForm.Select
            name="role"
            label="Perfil"
            required
            placeholder="Selecione um perfil"
            options={[
              { value: 'admin', label: 'Administrador' },
              { value: 'manager', label: 'Gerente' },
              { value: 'user', label: 'Usuário' },
              { value: 'guest', label: 'Visitante', disabled: true },
            ]}
          />

          <UserForm.RadioGroup
            name="department"
            label="Departamento"
            required
            row
            options={[
              { value: 'tech', label: 'Tecnologia' },
              { value: 'sales', label: 'Vendas' },
              { value: 'hr', label: 'RH' },
            ]}
          />

          <UserForm.DatePicker
            name="birthDate"
            label="Data de nascimento"
          />

          <UserForm.Switch
            name="active"
            label="Usuário ativo"
          />

          <UserForm.Checkbox
            name="notifications"
            label="Receber notificações por e-mail"
          />

          <Divider sx={{ my: 2 }} />

          <UserForm.Actions align="right">
            <UserForm.Button buttonType="reset">Limpar</UserForm.Button>
            <UserForm.Button
              buttonType="submit"
              loadingText="Salvando..."
            >
              Salvar
            </UserForm.Button>
          </UserForm.Actions>
        </Stack>
      </UserForm.Container>
    </Paper>
  );
}

// ============================================================================
// EXEMPLO 2: Form de Busca - Demonstra reutilização do padrão
// ============================================================================

interface SearchFormData {
  query: string;
  category: string;
}

const SearchForm = createTypedForm<SearchFormData>();

export function SearchFormExample() {
  const handleSearch = (data: SearchFormData) => {
    console.log('Search:', data);
  };

  return (
    <Paper
      elevation={2}
      sx={{ p: 3, maxWidth: 800, mx: 'auto', mt: 4 }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{ mb: 2, fontWeight: 600 }}
      >
        Busca
      </Typography>

      <SearchForm.Container
        defaultValues={{ query: '', category: 'all' }}
        onSubmit={handleSearch}
        mode="onChange"
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          alignItems="flex-start"
        >
          <SearchForm.Input
            name="query" // ✅ autocomplete: "query" | "category"
            label="Buscar"
            placeholder="Digite sua busca..."
            size="small"
            sx={{ flex: 1, minWidth: 300 }}
          />

          <SearchForm.Select
            name="category"
            label="Categoria"
            size="small"
            fullWidth={false}
            sx={{ minWidth: 150 }}
            options={[
              { value: 'all', label: 'Todas' },
              { value: 'products', label: 'Produtos' },
              { value: 'services', label: 'Serviços' },
              { value: 'articles', label: 'Artigos' },
            ]}
          />

          <SearchForm.Button
            buttonType="submit"
            size="small"
            variant="outlined"
            sx={{ mt: '4px' }}
          >
            Buscar
          </SearchForm.Button>
        </Stack>
      </SearchForm.Container>
    </Paper>
  );
}

// ============================================================================
// EXEMPLO 3: Form de Configurações - Demonstra switches e checkboxes
// ============================================================================

interface SettingsFormData {
  language: string;
  darkMode: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
  twoFactorAuth: boolean;
}

const SettingsForm = createTypedForm<SettingsFormData>();

export function SettingsFormExample() {
  const defaultValues: SettingsFormData = {
    language: 'pt-BR',
    darkMode: false,
    emailNotifications: true,
    pushNotifications: false,
    twoFactorAuth: true,
  };

  const handleSaveSettings = async (data: SettingsFormData) => {
    console.log('Settings:', data);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    alert('Configurações salvas com sucesso!');
  };

  return (
    <Paper
      elevation={2}
      sx={{ p: 4, maxWidth: 600, mx: 'auto', mt: 4 }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{ mb: 3, fontWeight: 600 }}
      >
        Configurações da Conta
      </Typography>

      <SettingsForm.Container
        defaultValues={defaultValues}
        onSubmit={handleSaveSettings}
      >
        <Stack spacing={3}>
          <SettingsForm.Select
            name="language" // ✅ autocomplete: "language" | "darkMode" | "emailNotifications" | ...
            label="Idioma"
            options={[
              { value: 'pt-BR', label: 'Português (Brasil)' },
              { value: 'pt-PT', label: 'Português (Portugal)' },
              { value: 'en-US', label: 'English' },
              { value: 'es-ES', label: 'Español' },
            ]}
          />

          <Divider />

          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 600 }}
          >
            Notificações
          </Typography>

          <SettingsForm.Switch
            name="emailNotifications"
            label="Notificações por e-mail"
          />

          <SettingsForm.Switch
            name="pushNotifications"
            label="Notificações push"
          />

          <Divider />

          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 600 }}
          >
            Segurança
          </Typography>

          <SettingsForm.Switch
            name="darkMode"
            label="Ativar modo escuro"
          />

          <SettingsForm.Switch
            name="twoFactorAuth"
            label="Autenticação de dois fatores"
          />

          <Divider sx={{ my: 2 }} />

          <SettingsForm.Actions align="right">
            <SettingsForm.Button
              buttonType="reset"
              keepDefaultValues={true}
            >
              Cancelar
            </SettingsForm.Button>
            <SettingsForm.Button
              buttonType="submit"
              loadingText="Salvando..."
            >
              Salvar Configurações
            </SettingsForm.Button>
          </SettingsForm.Actions>
        </Stack>
      </SettingsForm.Container>
    </Paper>
  );
}

// ============================================================================
// COMPONENTE PARA EXIBIR TODOS OS EXEMPLOS
// ============================================================================

export function FormExamplesShowcase() {
  return (
    <Stack
      spacing={6}
      sx={{ p: 4, maxWidth: 900, mx: 'auto' }}
    >
      <div>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ mb: 1, fontWeight: 700 }}
        >
          Exemplos de Uso - createTypedForm
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ mb: 4 }}
        >
          Veja como usar o factory createTypedForm para eliminar repetição de tipos genéricos
        </Typography>
      </div>

      <UserFormExample />
      <SearchFormExample />
      <SettingsFormExample />
    </Stack>
  );
}
