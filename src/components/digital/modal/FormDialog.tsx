'use client';

import * as React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
  Stack,
  Typography,
  type DialogProps,
  type SxProps,
  type Theme,
  Slide,
  Fade,
  Grow,
} from '@mui/material';
import type { TransitionProps } from '@mui/material/transitions';
import { alpha } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';

type Reason = 'backdropClick' | 'escapeKeyDown' | 'closeButton' | 'action';

// Fábrica para criar transições Slide com direção fixa
function makeSlide(direction: 'up' | 'down' | 'left' | 'right') {
  return React.forwardRef<HTMLDivElement, TransitionProps>(function SlideDir(props, ref) {
    return (
      <Slide
        direction={direction}
        ref={ref}
        {...props}
      >
        {props.children ? <>{props.children}</> : <span />}
      </Slide>
    );
  });
}

const SlideDown = makeSlide('down');

const SlideUp = React.forwardRef<HTMLDivElement, TransitionProps>(function SlideUp(props, ref) {
  return (
    <Slide
      direction="up"
      ref={ref}
      {...props}
    >
      <>{props.children}</>
    </Slide>
  );
});

const transitionMap = {
  fade: Fade,
  grow: Grow,
  'slide-up': SlideUp,
  'slide-down': SlideDown,
} as const;

export type AppDialogProps = {
  open: boolean;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;

  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
  onClose?: (event: object, reason: Reason) => void;

  confirmText?: string;
  cancelText?: string;
  confirmColor?: 'primary' | 'secondary' | 'error' | 'warning' | 'success' | 'info';
  loading?: boolean;

  disableBackdropClose?: boolean;
  disableEscapeKeyDown?: boolean;

  appearance?: 'glass' | 'solid';
  PaperSx?: SxProps<Theme>;

  maxWidth?: DialogProps['maxWidth'];
  fullWidth?: boolean;

  showCloseIcon?: boolean;
  actions?: React.ReactNode;

  transition?: keyof typeof transitionMap;

  dialogProps?: Omit<DialogProps, 'open' | 'onClose' | 'maxWidth' | 'fullWidth' | 'TransitionComponent' | 'PaperProps'>;
};

export default function FormDialog({
  open,
  title,
  subtitle,
  children,

  onConfirm,
  onCancel,
  onClose,

  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  confirmColor = 'primary',
  loading = false,

  disableBackdropClose = false,
  disableEscapeKeyDown = false,

  appearance = 'glass',
  PaperSx,

  maxWidth = 'sm',
  fullWidth = true,

  showCloseIcon = true,
  actions,

  transition = 'fade',
  dialogProps,
}: AppDialogProps) {
  const TransitionComponent = transitionMap[transition] ?? Fade;

  const handleInternalClose = React.useCallback(
    (event: object, reason: Reason) => {
      if (disableBackdropClose && reason === 'backdropClick') return;
      if (disableEscapeKeyDown && reason === 'escapeKeyDown') return;

      onClose?.(event, reason);
      if (reason !== 'action') onCancel?.();
    },
    [disableBackdropClose, disableEscapeKeyDown, onClose, onCancel]
  );

  return (
    <Dialog
      open={open}
      keepMounted
      onClose={(e, r) => handleInternalClose(e, (r as Reason) ?? 'action')}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      TransitionComponent={TransitionComponent}
      PaperProps={{
        sx: (theme) => {
          const isDark = theme.palette.mode === 'dark';
          const glassBg = isDark ? alpha('#00ffff', 0.05) : alpha('#ffffff', 0.9);
          const baseSx = {
            backgroundColor: appearance === 'glass' ? glassBg : theme.palette.background.paper,
            backdropFilter: appearance === 'glass' ? 'blur(6px)' : undefined,
            boxShadow: '0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.07)',
            border:
              appearance === 'glass'
                ? '1px solid rgba(255,255,255,0.18)'
                : `1px solid ${alpha(theme.palette.common.black, 0.06)}`,
            borderRadius: 12,
          };
          if (typeof PaperSx === 'function') {
            return { ...baseSx, ...PaperSx(theme) };
          }
          if (PaperSx && typeof PaperSx === 'object') {
            return { ...baseSx, ...PaperSx };
          }
          return baseSx;
        },
      }}
      {...dialogProps}
    >
      {(title || showCloseIcon) && (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 2, pt: 1.5 }}
        >
          <Stack>
            {title && (
              <DialogTitle sx={{ p: 0, pr: 4 }}>
                {typeof title === 'string' ? <Typography variant="h6">{title}</Typography> : title}
              </DialogTitle>
            )}
            {subtitle && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: title ? 0.5 : 0 }}
              >
                {subtitle}
              </Typography>
            )}
          </Stack>

          {showCloseIcon && (
            <IconButton
              aria-label="Fechar"
              edge="end"
              onClick={(e) => handleInternalClose(e, 'closeButton')}
              disabled={loading}
              sx={{ ml: 1 }}
            >
              <CloseIcon />
            </IconButton>
          )}
        </Stack>
      )}

      <DialogContent sx={{ px: 2, pt: 2 }}>{children}</DialogContent>

      <DialogActions sx={{ px: 2, pb: 2 }}>
        {actions ?? (
          <>
            <Button
              onClick={(e) => handleInternalClose(e, 'action')}
              disabled={loading}
              variant="contained"
              color="inherit"
            >
              {cancelText}
            </Button>
            {onConfirm && (
              <Button
                onClick={onConfirm}
                disabled={loading}
                variant="contained"
                color={confirmColor}
              >
                {loading ? 'Processando...' : confirmText}
              </Button>
            )}
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}

/* 
'use client';

import * as React from 'react';
import { Button } from '@mui/material';
import AppDialog from '@/components/common/AppDialog';

export default function Example() {
  const [open, setOpen] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);

  const handleConfirmDelete = async () => {
    try {
      setDeleting(true);
      // sua lógica de exclusão...
      await new Promise((r) => setTimeout(r, 800));
    } finally {
      setDeleting(false);
      setOpen(false);
    }
  };

  return (
    <>
      <Button color="error" variant="contained" onClick={() => setOpen(true)}>
        Excluir registro
      </Button>

      <AppDialog
        open={open}
        title="Confirmar exclusão"
        subtitle="Esta ação não poderá ser desfeita."
        appearance="glass"
        transition="slide-up"
        disableBackdropClose
        onClose={() => setOpen(false)}
        onConfirm={handleConfirmDelete}
        confirmText={deleting ? 'Excluindo...' : 'Excluir'}
        confirmColor="error"
        loading={deleting}
      >
        Tem certeza que deseja excluir este registro?
      </AppDialog>
    </>
  );
}
 */
