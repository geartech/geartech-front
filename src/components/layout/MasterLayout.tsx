'use client';

import React, { useState } from 'react';
import { Box, CssBaseline } from '@mui/material';
import { MenuDrawer } from './MenuDrawer';
import { Header } from './Header';

const drawerWidth = 240;

interface MasterLayoutProps {
  children: React.ReactNode;
}

export default function MasterLayout({ children }: MasterLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const [expanded, setExpanded] = useState(true);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      <CssBaseline />
      <Header handleDrawerToggle={handleDrawerToggle} />
      <Box sx={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <MenuDrawer
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
          expanded={expanded}
          onToggleExpand={() => setExpanded((prev) => !prev)}
        />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            p: 1,
            mt: 8,
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
          }}
        >
          <Box sx={{ flex: 1, overflow: 'auto', minHeight: 0 }}>{children}</Box>
        </Box>
      </Box>
      {/* <Footer /> */}
    </Box>
  );
}
