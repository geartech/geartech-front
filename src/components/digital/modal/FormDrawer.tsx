'use client';

import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { alpha } from '@mui/material/styles';
import type { DrawerProps } from '@mui/material/Drawer';

type CloseReason = 'backdropClick' | 'escapeKeyDown' | 'closeButton';

export type FormDrawerProps = {
  open?: boolean;

  title?: React.ReactNode;
  subtitle?: React.ReactNode;

  /** Seu callback simplificado */
  onClose?: (reason: CloseReason) => void;

  anchor?: DrawerProps['anchor']; // 'left' | 'right' | 'top' | 'bottom'
  variant?: DrawerProps['variant']; // 'temporary' | 'persistent' | 'permanent'

  width?: number | string;
  height?: number | string;

  appearance?: 'glass' | 'solid';
  showCloseIcon?: boolean;

  disableBackdropClose?: boolean;
  disableEscapeKeyDown?: boolean;

  drawerProps?: Omit<DrawerProps, 'open' | 'onClose' | 'anchor' | 'variant' | 'PaperProps'>;

  children?: React.ReactNode;
};

export default function FormDrawer(props: FormDrawerProps) {
  const {
    open,
    title,
    subtitle,
    onClose,

    anchor = 'right',
    variant = 'temporary',

    width = 480,
    height = '65vh',

    appearance = 'glass',
    showCloseIcon = true,

    disableBackdropClose = false,
    disableEscapeKeyDown = false,

    drawerProps,
    children,
  } = props;

  const isOpen = open ?? true;

  const isHorizontal = anchor === 'top' || anchor === 'bottom';
  const sizeStyle = isHorizontal ? { height } : { width };

  // Assina igual ao MUI: (event, reason)
  const handleClose = (_event: React.SyntheticEvent | Event, reason: 'backdropClick' | 'escapeKeyDown') => {
    if (disableBackdropClose && reason === 'backdropClick') return;
    if (disableEscapeKeyDown && reason === 'escapeKeyDown') return;
    onClose?.(reason);
  };

  // Clique no X envia 'closeButton'
  const handleCloseButton = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose?.('closeButton');
  };

  return (
    <Drawer
      open={isOpen}
      anchor={anchor}
      variant={variant}
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      PaperProps={{
        sx: (t) => {
          const isDark = t.palette.mode === 'dark';
          const glassBg = isDark ? alpha('#00ffff', 0.05) : alpha('#ffffff', 0.92);
          return {
            ...sizeStyle,
            backgroundColor: appearance === 'glass' ? glassBg : t.palette.background.paper,
            backdropFilter: appearance === 'glass' ? 'blur(20px)' : undefined,
            boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
            borderLeft: anchor === 'right' ? `1px solid ${alpha(t.palette.common.black, 0.06)}` : undefined,
            borderRight: anchor === 'left' ? `1px solid ${alpha(t.palette.common.black, 0.06)}` : undefined,
            borderTop: anchor === 'bottom' ? `1px solid ${alpha(t.palette.common.black, 0.06)}` : undefined,
            borderBottom: anchor === 'top' ? `1px solid ${alpha(t.palette.common.black, 0.06)}` : undefined,
            display: 'flex',
            flexDirection: 'column',
          };
        },
      }}
      {...drawerProps}
    >
      {(title || showCloseIcon) && (
        <>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ px: 2, py: 1.5 }}
          >
            <Box>
              {title && (
                <Typography
                  variant="h6"
                  component="div"
                >
                  {title}
                </Typography>
              )}
              {subtitle && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {subtitle}
                </Typography>
              )}
            </Box>

            {showCloseIcon && (
              <IconButton
                aria-label="Fechar"
                onClick={handleCloseButton}
              >
                <CloseIcon />
              </IconButton>
            )}
          </Stack>
          <Divider />
        </>
      )}

      <Box sx={{ p: 2, flex: 1, overflow: 'auto' }}>{children}</Box>

      {/* Footer opcional — substitua por props se desejar */}
      {/* <Divider />
      <Box sx={{ p: 2 }} /> */}
    </Drawer>
  );
}
