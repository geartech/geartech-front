'use client';

import React, { useState } from 'react';
import {
  Drawer,
  Toolbar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  TextField,
  InputAdornment,
  ListItemButton,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material/styles';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { menuItems } from '@/app/menu/menuItems';
import Link from 'next/link';
import { hasPermission } from '@/app/utils/hasPermission';
import { useAuth } from '@/core/context/AuthProvider';

const drawerWidth = 240;

interface MenuDrawerProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

export function MenuDrawer({ mobileOpen, handleDrawerToggle }: MenuDrawerProps) {
  const { user } = useAuth();
  const [expanded, setExpanded] = useState(true); // eslint-disable-line @typescript-eslint/no-unused-vars
  const [openSubmenus, setOpenSubmenus] = useState<{ [key: string]: boolean }>({});
  const [search, setSearch] = useState('');
  const currentDrawerWidth = expanded ? drawerWidth : 40;
  const theme = useTheme();

  // Lida com expansão/retração de submenus
  const handleSubmenuToggle = (text: string) => {
    setOpenSubmenus((prev) => ({ ...prev, [text]: !prev[text] }));
  };

  // Filtra itens pelo campo de pesquisa
  const filterMenu = (items: typeof menuItems) =>
    items
      .map((item) => {
        if (!hasPermission(user, item.permission)) return null;

        if (item.children) {
          const filteredChildren = item.children.filter(
            (child) => hasPermission(user, child.permission) && child.text.toLowerCase().includes(search.toLowerCase())
          );

          if (item.text.toLowerCase().includes(search.toLowerCase()) || filteredChildren.length > 0) {
            return { ...item, children: filteredChildren };
          }
          return null;
        }

        if (item.text.toLowerCase().includes(search.toLowerCase())) return item;
        return null;
      })
      .filter(Boolean) as typeof menuItems;

  const drawer = (
    <div style={{ marginTop: '50px' }}>
      <Toolbar
        sx={{
          minHeight: '50px !important',
          m: '0px !important',
          p: '5px !important',
        }}
      >
        {expanded && (
          <TextField
            variant="outlined"
            size="small"
            placeholder="Pesquisar…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ width: '100%' }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: theme.palette.text.secondary }} />
                  </InputAdornment>
                ),
              },
            }}
          />
        )}
      </Toolbar>
      <Divider />
      <List>
        {filterMenu(menuItems).map((item) => {
          const hasChildren = !!item.children && item.children.length > 0;

          return (
            <React.Fragment key={item.text}>
              <ListItem
                disablePadding
                sx={{ height: 35 }}
              >
                <ListItemButton
                  component={item.href ? Link : 'div'}
                  href={item.href ?? '#'}
                  sx={{
                    justifyContent: expanded ? 'initial' : 'center',
                    px: 1,
                    transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
                  }}
                  onClick={() => {
                    if (hasChildren && expanded) {
                      handleSubmenuToggle(item.text);
                    }
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 26,
                      display: 'flex',
                      alignItems: 'center',
                      mr: expanded ? 1 : 'auto',
                      justifyContent: 'flex-start',
                      transition: 'margin 0.3s cubic-bezier(0.4,0,0.2,1)',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {expanded && (
                    <ListItemText
                      primary={item.text}
                      sx={{
                        m: 0,
                        transition: 'opacity 0.3s cubic-bezier(0.4,0,0.2,1)',
                        opacity: expanded ? 1 : 0,
                        fontSize: 14,
                        '& .MuiTypography-root': {
                          fontSize: 14,
                          lineHeight: '1.5',
                          display: 'flex',
                          alignItems: 'center',
                        },
                      }}
                    />
                  )}
                  {expanded &&
                    hasChildren &&
                    (openSubmenus[item.text] ? (
                      <ExpandLess sx={{ fontSize: 20 }} />
                    ) : (
                      <ExpandMore sx={{ fontSize: 20 }} />
                    ))}
                </ListItemButton>
              </ListItem>

              {hasChildren && expanded && (
                <Collapse
                  in={!!openSubmenus[item.text]}
                  timeout="auto"
                  unmountOnExit
                >
                  <List
                    component="div"
                    disablePadding
                  >
                    {item.children!.map((child) => (
                      <ListItem
                        disablePadding
                        key={child.text}
                      >
                        <ListItemButton
                          component={child.href ? Link : 'div'}
                          href={child.href ?? '#'}
                          sx={{
                            justifyContent: expanded ? 'initial' : 'center',
                            px: 2,
                            py: 0.5,
                            backgroundColor: theme.palette.mode === 'dark' ? '#23272b' : '#f3f3f3',
                          }}
                        >
                          {expanded && (
                            <ListItemText
                              primary={child.text}
                              sx={{
                                p: 0,
                                m: 0,
                                fontSize: 14,
                                '& .MuiTypography-root': {
                                  fontSize: 14,
                                },
                              }}
                            />
                          )}
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          );
        })}
      </List>
    </div>
  );

  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          width: currentDrawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: currentDrawerWidth,
            boxSizing: 'border-box',
            overflowX: 'hidden',
            transition: 'width 0.3s cubic-bezier(0.4,0,0.2,1)',
          },
          display: { xs: 'none', sm: 'block' },
        }}
        open
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: currentDrawerWidth,
            overflowX: 'hidden',
            transition: 'width 0.3s cubic-bezier(0.4,0,0.2,1)',
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
