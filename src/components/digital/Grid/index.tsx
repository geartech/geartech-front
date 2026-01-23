import React, { useMemo, useState, useRef, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MaterialReactTable, MRT_ColumnDef, MRT_RowData, MRT_SortingState } from 'material-react-table';
import localization from './localization';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Tooltip } from '@mui/material';
import { PlagiarismOutlined, DeleteForeverOutlined, ModeEditOutline } from '@mui/icons-material';
import { Button } from '../Button';
import type { Updater } from '@tanstack/react-table';

type FooterActionsRenderer<T> =
  | JSX.Element
  | ((ctx: { selected: T[]; selectMode: boolean; toggleSelectMode: () => void }) => JSX.Element);

// Extensão do tipo MRT_ColumnDef para suportar enums
export type GridColumnDef<T extends MRT_RowData> = MRT_ColumnDef<T> & {
  columnType?: 'enum';
  enumType?: Record<string, string>;
  i18nPrefix?: string;
};

type PaginationState = {
  pageIndex: number;
  pageSize: number;
};

type SortingState = MRT_SortingState;

// Parâmetros enviados no onFetch
export type GridFetchParams = {
  pageNum: number;
  pageSize: number;
  orderColumn?: string;
  orderDirection?: 'ASC' | 'DESC';
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
  footerActions?: FooterActionsRenderer<T>;
  onMultipleDelete?: (ids: number[]) => void;
  // Paginação server-side
  totalRows?: number;
  initialPageSize?: number;
  // Callback único para fetch (substitui onPaginationChange + onSortingChange)
  onFetch?: (params: GridFetchParams) => void;
  // Loading state
  loading?: boolean;
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
  totalRows = 0,
  initialPageSize = 10,
  onFetch,
  loading = false,
}: GridProps<T>) {
  const { t } = useTranslation();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState<T | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Determina se é paginação/ordenação manual (server-side)
  const isServerSide = totalRows > 0 && !!onFetch;

  // Estado interno de paginação
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: initialPageSize,
  });

  // Estado interno de ordenação
  const [sorting, setSorting] = useState<SortingState>([]);

  // Flag para evitar fetch no mount
  const isInitialMount = useRef(true);

  // Multi-seleção
  const [selectMode, setSelectMode] = useState(false);
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

  // Exclusão múltipla
  const [confirmMultipleOpen, setConfirmMultipleOpen] = useState(false);
  const [idsToDelete, setIdsToDelete] = useState<number[]>([]);
  const [deletingMultiple, setDeletingMultiple] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Dispara fetch quando paginação/sorting mudam (apenas server-side)
  useEffect(() => {
    if (!isServerSide) return;

    // Pula o primeiro render
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    onFetch?.({
      pageNum: pagination.pageIndex + 1,
      pageSize: pagination.pageSize,
      orderColumn: sorting[0]?.id,
      orderDirection: sorting[0] ? (sorting[0].desc ? 'DESC' : 'ASC') : undefined,
    });
  }, [pagination, sorting, isServerSide, onFetch]);

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
      setRowSelection({});
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

      if (typeof newCol.header === 'string') {
        newCol.header = t(newCol.header);
      }

      if (col.columnType === 'enum' && col.enumType && col.i18nPrefix) {
        newCol = {
          ...newCol,
          Cell: ({ cell }) => {
            const value = cell.getValue() as string;
            if (!value) return null;
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

  // Handler de mudança de paginação
  const handlePaginationChange = useCallback((updater: Updater<PaginationState>) => {
    setPagination((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      // Se mudou pageSize, volta para página 0
      if (next.pageSize !== prev.pageSize) {
        return { pageIndex: 0, pageSize: next.pageSize };
      }
      return next;
    });
  }, []);

  // Handler de mudança de ordenação
  const handleSortingChange = useCallback((updater: Updater<SortingState>) => {
    setSorting((prev) => (typeof updater === 'function' ? updater(prev) : updater));
    // Reset para página 1 ao mudar ordenação
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  }, []);

  // Expõe resetPagination via ref se necessário no futuro
  // useImperativeHandle(ref, () => ({ resetPagination }));

  return (
    <>
      <div
        ref={containerRef}
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          minHeight: 0,
          width: '100%',
        }}
      >
        <MaterialReactTable
          enableStickyHeader
          columns={colsWithActions}
          data={data}
          localization={localization}
          paginationDisplayMode="pages"
          enableDensityToggle={false}
          muiPaginationProps={{ shape: 'rounded' }}
          muiTableContainerProps={{
            sx: {
              height: height || '100%',
              flex: height ? undefined : 1,
              minHeight: 0,
              display: 'flex',
              flexDirection: 'column',
            },
          }}
          muiTablePaperProps={{
            sx: {
              borderRadius: 3,
              boxShadow: 2,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            },
          }}
          initialState={{
            density: 'compact',
          }}
          // Paginação e ordenação manual quando server-side
          manualPagination={isServerSide}
          manualSorting={isServerSide}
          rowCount={isServerSide ? totalRows : undefined}
          // Estado controlado
          state={{
            rowSelection,
            pagination,
            sorting,
            isLoading: loading,
          }}
          onPaginationChange={handlePaginationChange}
          onSortingChange={handleSortingChange}
          // Título
          renderTopToolbarCustomActions={() =>
            title ? <span style={{ fontSize: 20, fontWeight: 600, marginLeft: 2 }}>{title}</span> : null
          }
          // Checkboxes
          enableRowSelection={selectMode}
          enableMultiRowSelection
          onRowSelectionChange={setRowSelection}
          // Sem banner de alerta
          renderToolbarAlertBannerContent={() => null}
          muiToolbarAlertBannerProps={{ sx: { display: 'none' } }}
          // Footer
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
                  <>
                    {selectMode && (
                      <Button buttonType="cancel" onClick={toggleSelectMode} sx={{ ml: 1 }}>
                        {t('cancel')}
                      </Button>
                    )}
                    <Button
                      buttonType="delete"
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
                  </>
                )}
                {selectMode && <span style={{ fontSize: 14, opacity: 0.8 }}>{selected.length} selecionado(s)</span>}
              </div>
            );
          }}
        />
      </div>

      {/* Dialog de confirmação de exclusão individual */}
      <Dialog
        open={confirmOpen}
        onClose={(event, reason) => {
          if (reason === 'backdropClick') return;
          setConfirmOpen(false);
        }}
        slotProps={{
          paper: {
            sx: (theme) => ({
              background: theme.palette.mode === 'dark' ? 'rgba(0, 255, 255, 0.05)' : 'rgba(255, 255, 255, 1)',
              backdropFilter: 'blur(5px)',
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
          <Button onClick={() => setConfirmOpen(false)} buttonType="back" disabled={deleting}>
            {t('cancel')}
          </Button>
          <Button onClick={handleConfirmDelete} buttonType="delete" disabled={deleting}>
            {deleting ? t('deleting') : t('delete')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog de confirmação de exclusão múltipla */}
      <Dialog
        open={confirmMultipleOpen}
        onClose={(event, reason) => {
          if (reason === 'backdropClick') return;
          setConfirmMultipleOpen(false);
        }}
        slotProps={{
          paper: {
            sx: (theme) => ({
              background: theme.palette.mode === 'dark' ? 'rgba(0, 255, 255, 0.05)' : 'rgba(255, 255, 255, 1)',
              backdropFilter: 'blur(5px)',
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
          <Button onClick={() => setConfirmMultipleOpen(false)} buttonType="back" disabled={deletingMultiple}>
            {t('cancel')}
          </Button>
          <Button onClick={handleConfirmMultipleDelete} buttonType="delete" disabled={deletingMultiple}>
            {deletingMultiple ? t('deleting') : t('deleteAll')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
