import PieChartIcon from '@mui/icons-material/PieChart';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

interface MenuItemProps {
  text: string;
  icon?: React.ReactNode;
  href?: string;
  children?: MenuItemProps[];
}

export const menuItems: MenuItemProps[] = [
  {
    text: 'Dashboard',
    icon: <PieChartIcon sx={{ fontSize: 20 }} />,
    children: [
      { text: 'Overview', href: '/pages/dashboard' },
      { text: 'Stats', href: '/pages/dashboard' },
    ],
  },
  {
    text: 'Apps',
    icon: <DesktopWindowsIcon sx={{ fontSize: 20 }} />,
    children: [
      { text: 'Web App', href: '/pages/dashboard' },
      { text: 'Mobile App', href: '/pages/dashboard' },
    ],
  },
  { text: 'User', icon: <PersonIcon sx={{ fontSize: 20 }} /> },
  {
    text: 'Team',
    icon: <GroupIcon sx={{ fontSize: 20 }} />,
    children: [
      { text: 'Members', href: '/pages/dashboard' },
      { text: 'Roles', href: '/pages/dashboard' },
    ],
  },
  { text: 'Files', icon: <InsertDriveFileIcon sx={{ fontSize: 20 }} /> },
];
