import PieChartIcon from '@mui/icons-material/PieChart';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
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
    permission: ['ADM', 'PERM_DASHBOARD_VIEW'],
    children: [
      { text: 'Overview', href: '/pages/auth/dashboard/user', permission: ['ADM', 'PERM_DASHBOARD_VIEW'] },
      { text: 'Stats', href: '/pages/auth/dashboard/stats', permission: ['ADM', 'PERM_DASHBOARD_VIEW'] },
    ],
  },
  {
    text: 'Apps',
    icon: <DesktopWindowsIcon sx={{ fontSize: 20 }} />,
    permission: ['ADM', 'PERM_DASHBOARD_VIEW'],
    children: [
      { text: 'Web App', href: '/pages/dashboard', permission: ['ADM', 'PERM_DASHBOARD_VIEW'] },
      { text: 'Mobile App', href: '/pages/dashboard', permission: ['ADM', 'PERM_DASHBOARD_VIEW'] },
    ],
  },
  {
    text: 'User',
    icon: <PersonIcon sx={{ fontSize: 20 }} />,
    permission: ['PERM_DASHBOARD_VIEW'],
  },
  {
    text: 'Team',
    icon: <GroupIcon sx={{ fontSize: 20 }} />,
    permission: ['PERM_DASHBOARD_VIEW'],
    children: [
      { text: 'Members', href: '/pages/dashboard', permission: ['PERM_DASHBOARD_VIEW'] },
      { text: 'Roles', href: '/pages/dashboard', permission: ['PERM_DASHBOARD_VIEW'] },
    ],
  },
  {
    text: 'Files',
    icon: <InsertDriveFileIcon sx={{ fontSize: 20 }} />,
    permission: ['PERM_DASHBOARD_VIEW'],
  },
];
