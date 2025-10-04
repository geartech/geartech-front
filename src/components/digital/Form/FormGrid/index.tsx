import React, { useMemo, useState } from 'react';
import { MaterialReactTable, MRT_ColumnDef, MRT_RowData } from 'material-react-table';
import localization from './localization';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Tooltip } from '@mui/material';
import { PlagiarismOutlined, DeleteForeverOutlined, ModeEditOutline } from '@mui/icons-material';

type FooterActionsRenderer<T> =
  | JSX.Element
  | ((ctx: { selected: T[]; selectMode: boolean; toggleSelectMode: () => void }) => JSX.Element);

type GridProps<T extends MRT_RowData> = {
  title?: string | JSX.Element;
  columns: MRT_ColumnDef<T>[];
  data: T[];
  height?: number | string;
  crudRow?: boolean;
  onView?: (row: T) => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => Promise<void> | void;
  footerActions?: FooterActionsRenderer<T>; // << botões no footer
};

export default function FormGrid<T extends MRT_RowData>({
  height,
  columns,
  data,
  crudRow,
  onView,
  onEdit,
  onDelete,
  footerActions,
}: GridProps<T>) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState<T | null>(null);
  const [deleting, setDeleting] = useState(false);

  // multi-seleção
  const [selectMode, setSelectMode] = useState(false);
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

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

  const toggleSelectMode = () => {
    setSelectMode((prev) => {
      const next = !prev;
      if (!next) setRowSelection({});
      return next;
    });
  };

  const colsWithActions = useMemo<MRT_ColumnDef<T>[]>(() => {
    if (!crudRow) return columns;
    return [
      {
        id: 'actions',
        header: 'Ações',
        size: 100,
        enableSorting: false,
        enableColumnActions: false,
        enableHiding: false,
        Cell: ({ row }) => {
          const item = row.original as T;
          return (
            <>
              <Tooltip title="Visualizar">
                <IconButton
                  aria-label="Visualizar"
                  size="small"
                  color="info"
                  onClick={() => onView?.(item)}
                  style={{ border: '1px solid', marginRight: 10 }}
                >
                  <PlagiarismOutlined fontSize="small" />
                </IconButton>
              </Tooltip>

              <Tooltip title="Editar">
                <IconButton
                  aria-label="Editar"
                  size="small"
                  color="warning"
                  onClick={() => onEdit?.(item)}
                  style={{ border: '1px solid', marginRight: 10 }}
                >
                  <ModeEditOutline fontSize="small" />
                </IconButton>
              </Tooltip>

              <Tooltip title="Excluir">
                <IconButton
                  aria-label="Excluir"
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
            </>
          );
        },
      },
      ...columns,
    ];
  }, [columns, crudRow, onEdit, onView]);

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
            height: height || 'calc(100vh - 290px)', // ocupa todo o espaço disponível
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
        renderTopToolbarCustomActions={() => (
          <span style={{ fontSize: 20, fontWeight: 600, marginLeft: 2 }}>Título do Grid</span>
        )}
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

          return (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {selectMode && <span style={{ fontSize: 12, opacity: 0.8 }}>{selected.length} selecionado(s)</span>}
              {content || null}
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
        PaperProps={{
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
        }}
      >
        <DialogTitle>Confirmar exclusão</DialogTitle>
        <DialogContent>Tem certeza que deseja excluir este registro?</DialogContent>
        <DialogActions>
          <Button
            onClick={() => setConfirmOpen(false)}
            color="primary"
            variant="contained"
            disabled={deleting}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
            disabled={deleting}
          >
            {deleting ? 'Excluindo...' : 'Excluir'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
