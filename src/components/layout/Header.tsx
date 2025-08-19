'use client';

import * as React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useThemeMode } from '@/components/theme/ThemeContext';

interface HeaderProps {
  handleDrawerToggle: () => void;
}

export function Header({ handleDrawerToggle }: HeaderProps) {
  const { mode, toggleMode } = useThemeMode();

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, height: 50 }}
    >
      <Toolbar sx={{ alignItems: 'center', minHeight: '50px !important' }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1 }}
        >
          Geartech
        </Typography>
        <IconButton
          onClick={toggleMode}
          color="inherit"
          aria-label={mode === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
        >
          {mode === 'dark' ? <DarkModeIcon sx={{ fontSize: 18 }} /> : <LightModeIcon sx={{ fontSize: 18 }} />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
