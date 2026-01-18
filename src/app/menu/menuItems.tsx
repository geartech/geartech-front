import { Home } from '@mui/icons-material';
import Workspaces from '@mui/icons-material/Workspaces';
import Settings from '@mui/icons-material/Settings';
import BarChart from '@mui/icons-material/BarChart';
import SmartToy from '@mui/icons-material/SmartToy';

interface MenuItemProps {
  text: string;
  icon?: React.ReactNode;
  href?: string;
  permission?: string | string[];
  children?: MenuItemProps[];
}

export const menuItems: MenuItemProps[] = [
  {
    text: 'Home',
    icon: <Home sx={{ fontSize: 22 }} />,
    href: '/pages/auth/dashboard/ProjectDash',
  },
  {
    text: 'Workspace',
    icon: <Workspaces sx={{ fontSize: 20 }} />,
    permission: ['ADM', 'WORKSPACE_ACCESS'],
    children: [
      {
        text: 'Projetos',
        href: '/pages/auth/workspace/project/ProjectList',
        permission: ['ADM', 'PROJECT_ACCESS'],
      },
      {
        text: 'Ordens De Serviço',
        href: '/pages/auth/workspace/serviceOrder/ServiceOrderList',
        permission: ['ADM', 'PROJECT_ACCESS'],
      },
      {
        text: 'Sprints',
        href: '/pages/auth/workspace/sprint/SprintList',
        permission: ['ADM', 'PROJECT_ACCESS'],
      },
      {
        text: 'Tarefas',
        href: '/pages/auth/workspace/task/TaskList',
        permission: ['ADM', 'PROJECT_ACCESS'],
      },
    ],
  },
  {
    text: 'Dashboards',
    icon: <BarChart sx={{ fontSize: 20 }} />,
    permission: ['ADM', 'DASHBOARD_ACCESS'],
    children: [
      {
        text: 'Projetos',
        href: '/pages/auth/dashboard/ProjectDash',
        permission: ['ADM', 'PROJECT_DASHBOARD'],
      },
    ],
  },
  {
    text: 'Automações / IA',
    icon: <SmartToy sx={{ fontSize: 20 }} />,
    permission: ['ADM', 'SETTINGS_ACCESS'],
    children: [
      { text: 'Projects', href: '/pages/auth/workspace/project/ProjectList', permission: ['ADM', 'PROJECT_ACCESS'] },
    ],
  },
  {
    text: 'Configurações',
    icon: <Settings sx={{ fontSize: 20 }} />,
    permission: ['ADM', 'SETTINGS_ACCESS'],
    children: [
      { text: 'Regras', href: '/pages/auth/settings/project/ProjectList', permission: ['ADM', 'PROJECT_ACCESS'] },
      { text: 'Integrações', href: '/pages/auth/settings/project/ProjectList', permission: ['ADM', 'PROJECT_ACCESS'] },
      { text: 'Usuários', href: '/pages/auth/settings/users/UserList', permission: ['ADM', 'USER_ACCESS'] },
      {
        text: 'Templates / Fluxos',
        href: '/pages/auth/settings/project/ProjectList',
        permission: ['ADM', 'PROJECT_ACCESS'],
      },
    ],
  },
];
