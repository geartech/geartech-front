import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MaterialReactTable, MRT_ColumnDef, MRT_RowData } from 'material-react-table';
import localization from './localization';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Tooltip } from '@mui/material';
import { PlagiarismOutlined, DeleteForeverOutlined, ModeEditOutline } from '@mui/icons-material';
import { Button } from '../Button';

type FooterActionsRenderer<T> =
  | JSX.Element
  | ((ctx: { selected: T[]; selectMode: boolean; toggleSelectMode: () => void }) => JSX.Element);

// Extensão do tipo MRT_ColumnDef para suportar enums
export type GridColumnDef<T extends MRT_RowData> = MRT_ColumnDef<T> & {
  columnType?: 'enum';
  enumType?: Record<string, string>;
  i18nPrefix?: string;
};

type GridProps<T extends MRT_RowData> = {
  title?: string | JSX.Element;
  columns: GridColumnDef<T>[];
  data: T[];
  height?: number | string;
  crudRow?: boolean;
  onView?: (row: T) => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => Promise<void> | void;
  footerActions?: FooterActionsRenderer<T>; // << botões no footer
  onMultipleDelete?: (ids: (string | number)[]) => void; // << callback para exclusão múltipla
};

export default function Grid<T extends MRT_RowData>({
  height,
  columns,
  data,
  crudRow,
  onView,
  onEdit,
  onDelete,
  footerActions,
  onMultipleDelete,
  title,
}: GridProps<T>) {
  const { t } = useTranslation();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState<T | null>(null);
  const [deleting, setDeleting] = useState(false);

  // multi-seleção
  const [selectMode, setSelectMode] = useState(false);
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

  // exclusão múltipla
  const [confirmMultipleOpen, setConfirmMultipleOpen] = useState(false);
  const [idsToDelete, setIdsToDelete] = useState<(string | number)[]>([]);
  const [deletingMultiple, setDeletingMultiple] = useState(false);

  const handleConfirmDelete = async () => {
    if (!rowToDelete || !onDelete) {
      setConfirmOpen(false);
      setRowToDelete(null);
      return;
    }
    try {
      setDeleting(true);
      await onDelete(rowToDelete);
    } finally {
      setDeleting(false);
      setConfirmOpen(false);
      setRowToDelete(null);
    }
  };

  const handleConfirmMultipleDelete = async () => {
    if (!idsToDelete.length || !onMultipleDelete) {
      setConfirmMultipleOpen(false);
      setIdsToDelete([]);
      return;
    }
    try {
      setDeletingMultiple(true);
      await onMultipleDelete(idsToDelete);
    } finally {
      setDeletingMultiple(false);
      setConfirmMultipleOpen(false);
      setIdsToDelete([]);
      setRowSelection({}); // limpa seleção após exclusão
    }
  };

  const toggleSelectMode = () => {
    setSelectMode((prev) => {
      const next = !prev;
      if (!next) setRowSelection({});
      return next;
    });
  };

  // Processa colunas para aplicar tradução de headers e enums
  const processedColumns = useMemo<GridColumnDef<T>[]>(() => {
    return columns.map((col) => {
      let newCol = { ...col };

      // Traduz header se for string (chave i18n)
      if (typeof newCol.header === 'string') {
        newCol.header = t(newCol.header);
      }

      // Processa enum se aplicável
      if (col.columnType === 'enum' && col.enumType && col.i18nPrefix) {
        newCol = {
          ...newCol,
          Cell: ({ cell }) => {
            const value = cell.getValue() as string;
            if (!value) return null;

            // Traduz usando i18nPrefix: enum.projectStatus.IN_PROGRESS
            const translatedValue = t(`${col.i18nPrefix}.${value}`, value);
            return <span>{translatedValue}</span>;
          },
        };
      }

      return newCol;
    });
  }, [columns, t]);

  const colsWithActions = useMemo<MRT_ColumnDef<T>[]>(() => {
    if (!crudRow) return processedColumns;
    return [
      {
        id: 'actions',
        header: t('actions'),
        size: 80,
        minSize: 140,
        maxSize: 140,
        enableSorting: false,
        enableColumnActions: false,
        enableHiding: false,
        Cell: ({ row }) => {
          const item = row.original as T;
          return (
            <div style={{ display: 'flex', width: '40px', alignItems: 'center' }}>
              <Tooltip title={t('view')}>
                <IconButton
                  aria-label={t('view')}
                  size="small"
                  color="info"
                  onClick={() => onView?.(item)}
                  style={{ border: '1px solid', marginRight: 10 }}
                >
                  <PlagiarismOutlined fontSize="small" />
                </IconButton>
              </Tooltip>

              <Tooltip title={t('edit')}>
                <IconButton
                  aria-label={t('edit')}
                  size="small"
                  color="warning"
                  onClick={() => onEdit?.(item)}
                  style={{ border: '1px solid', marginRight: 10 }}
                >
                  <ModeEditOutline fontSize="small" />
                </IconButton>
              </Tooltip>

              <Tooltip title={t('delete')}>
                <IconButton
                  aria-label={t('delete')}
                  size="small"
                  color="error"
                  onClick={() => {
                    setRowToDelete(item);
                    setConfirmOpen(true);
                  }}
                  style={{ border: '1px solid', marginRight: 10 }}
                >
                  <DeleteForeverOutlined fontSize="small" />
                </IconButton>
              </Tooltip>
            </div>
          );
        },
      },
      ...processedColumns,
    ];
  }, [crudRow, processedColumns, t, onView, onEdit]);

  return (
    <>
      <MaterialReactTable
        enableStickyHeader
        columns={colsWithActions}
        data={data}
        localization={localization}
        paginationDisplayMode="pages"
        enableDensityToggle={false} // remove botão de alternância
        muiPaginationProps={{ shape: 'rounded' }}
        muiTableContainerProps={{
          sx: {
            height: height || 'calc(100vh - 360px)', // ocupa todo o espaço disponível
          },
        }}
        muiTablePaperProps={{
          sx: {
            borderRadius: 3, // bordas arredondadas
            boxShadow: 2,
          },
        }}
        initialState={{
          density: 'compact', // densidade fixa
        }}
        // título
        renderTopToolbarCustomActions={() =>
          title ? <span style={{ fontSize: 20, fontWeight: 600, marginLeft: 2 }}>{title}</span> : null
        }
        // checkboxes aparecem quando ligado
        enableRowSelection={selectMode}
        enableMultiRowSelection
        onRowSelectionChange={setRowSelection}
        state={{ rowSelection }}
        // sem banner
        renderToolbarAlertBannerContent={() => null}
        muiToolbarAlertBannerProps={{ sx: { display: 'none' } }}
        // footer: contagem + botões do caller
        renderBottomToolbarCustomActions={({ table }) => {
          const selected = table.getSelectedRowModel().flatRows.map((r) => r.original as T);
          const content =
            typeof footerActions === 'function'
              ? footerActions({ selected, selectMode, toggleSelectMode })
              : footerActions;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const ids = selected.map((s: any) => s.id);
          const temSelecao = ids.length > 0;

          return (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {content || null}
              {onMultipleDelete && (
                <Button
                  buttonType="delete"
                  color={selectMode ? 'error' : 'inherit'}
                  onClick={() => {
                    if (!selectMode) {
                      toggleSelectMode();
                    } else if (temSelecao) {
                      setIdsToDelete(ids);
                      setConfirmMultipleOpen(true);
                    }
                  }}
                  disabled={selectMode && !temSelecao}
                  sx={{ ml: 1 }}
                >
                  {selectMode ? t('deleteAll') : t('multipleDelete')}
                </Button>
              )}
              {selectMode && <span style={{ fontSize: 12, opacity: 0.8 }}>{selected.length} selecionado(s)</span>}
            </div>
          );
        }}
      />

      <Dialog
        open={confirmOpen}
        onClose={(event, reason) => {
          if (reason === 'backdropClick') return; // impede fechar no clique fora
          setConfirmOpen(false);
        }}
        slotProps={{
          paper: {
            sx: (theme) => ({
              background:
                theme.palette.mode === 'dark'
                  ? 'rgba(0, 255, 255, 0.05)' // vidro escuro
                  : 'rgba(255, 255, 255, 1)', // vidro claro
              backdropFilter: 'blur(5px)', // embaçado
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              borderRadius: 3,
            }),
          },
        }}
      >
        <DialogTitle>{t('confirmDelete')}</DialogTitle>
        <DialogContent>{t('confirmDeleteMessage')}</DialogContent>
        <DialogActions>
          <Button
            onClick={() => setConfirmOpen(false)}
            buttonType="back"
            disabled={deleting}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleConfirmDelete}
            buttonType="delete"
            disabled={deleting}
          >
            {deleting ? t('deleting') : t('delete')}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={confirmMultipleOpen}
        onClose={(event, reason) => {
          if (reason === 'backdropClick') return; // impede fechar no clique fora
          setConfirmMultipleOpen(false);
        }}
        slotProps={{
          paper: {
            sx: (theme) => ({
              background:
                theme.palette.mode === 'dark'
                  ? 'rgba(0, 255, 255, 0.05)' // vidro escuro
                  : 'rgba(255, 255, 255, 1)', // vidro claro
              backdropFilter: 'blur(5px)', // embaçado
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              borderRadius: 3,
            }),
          },
        }}
      >
        <DialogTitle>{t('confirmMultipleDelete')}</DialogTitle>
        <DialogContent>{t('confirmMultipleDeleteMessage', { count: idsToDelete.length })}</DialogContent>
        <DialogActions>
          <Button
            onClick={() => setConfirmMultipleOpen(false)}
            buttonType="back"
            disabled={deletingMultiple}
          >
            {t('cancel')}
          </Button>
          <Button
            onClick={handleConfirmMultipleDelete}
            buttonType="delete"
            disabled={deletingMultiple}
          >
            {deletingMultiple ? t('deleting') : t('deleteAll')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
