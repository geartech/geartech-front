import PieChartIcon from '@mui/icons-material/PieChart';
import Settings from '@mui/icons-material/Settings';
import { Home } from '@mui/icons-material';

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
    href: '/pages/auth/home',
  },
  {
    text: 'Dashboard',
    icon: <PieChartIcon sx={{ fontSize: 20 }} />,
    permission: ['ADM', 'DASHBOARD_ACCESS'],
    children: [
      {
        text: 'Projects',
        href: '/pages/auth/dashboard/ProjectDash',
        permission: ['ADM', 'PROJECT_DASHBOARD'],
      },
    ],
  },
  {
    text: 'Settings',
    icon: <Settings sx={{ fontSize: 20 }} />,
    permission: ['ADM', 'SETTINGS_ACCESS'],
    children: [
      { text: 'Projects', href: '/pages/auth/settings/project/ProjectList', permission: ['ADM', 'PROJECT_ACCESS'] },
    ],
  },
];
