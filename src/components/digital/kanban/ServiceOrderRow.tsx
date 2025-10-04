'use client';
import { Box, Paper, Stack, Typography, Chip, Divider } from '@mui/material';
import type { Project, ColumnId, Task } from '../kanban/types';
import Column from '../kanban/Column';
import TaskCard from '../kanban/TaskCard';
import PlaceholderCard from '../kanban/PlaceholderCard';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { makeDroppableId } from '../kanban/utils';

const COL_TITLES: Record<ColumnId, string> = {
  todo: 'A Fazer',
  doing: 'Em andamento',
  done: 'Concluído',
};

export default function ProjectRow({
  project,
  activeTaskId,
  activeInColumn,
}: {
  project: Project;
  activeTaskId: string | null;
  activeInColumn: ColumnId | null;
}) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'minmax(280px, 1fr) repeat(3, 1fr)',
        gap: 1.5,
        alignItems: 'flex-start',
      }}
    >
      {/* Coluna fixa: info do projeto */}
      <Paper sx={{ p: 1.5, minHeight: 160 }}>
        <Stack spacing={0.5}>
          <Typography variant="h6">
            {project.code} · {project.name}
          </Typography>
          <Divider />
          <Typography
            variant="subtitle2"
            color="text.secondary"
          >
            OS: OS012 - Cadastro de Usuarios
          </Typography>
          {project.owner && (
            <>
              <Typography
                variant="subtitle2"
                color="text.secondary"
              >
                Responsável: {project.owner}
              </Typography>
              <br />
            </>
          )}
          {/* Exemplo de chips/indicadores */}
          <Stack
            direction="row"
            spacing={1}
            mt={1}
          >
            <Chip
              size="small"
              label={`A Fazer: ${project.columns.todo.length}`}
            />
            <Chip
              size="small"
              label={`Em andamento: ${project.columns.doing.length}`}
            />
            <Chip
              size="small"
              label={`Concluído: ${project.columns.done.length}`}
              color="success"
            />
          </Stack>
        </Stack>
      </Paper>

      {/* 3 colunas do projeto */}
      {(['todo', 'doing', 'done'] as ColumnId[]).map((colId) => {
        const tasks = project.columns[colId];
        const droppableId = makeDroppableId(String(project.id), colId);
        return (
          <Column
            key={droppableId}
            droppableId={droppableId}
            title={COL_TITLES[colId]}
          >
            <SortableContext
              items={tasks.map((t) => t.id)}
              strategy={verticalListSortingStrategy}
            >
              {tasks.length > 0 ? (
                tasks.map((t: Task) =>
                  // enquanto arrasta, esconde o item ativo no local de origem
                  t.id === activeTaskId && activeInColumn === colId ? (
                    <PlaceholderCard key={t.id} />
                  ) : (
                    <TaskCard
                      key={t.id}
                      task={t}
                    />
                  )
                )
              ) : (
                <Box
                  sx={{
                    border: '2px dashed',
                    borderColor: 'divider',
                    borderRadius: 1,
                    minHeight: 44,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'text.secondary',
                    fontSize: 13,
                  }}
                >
                  Arraste uma tarefa aqui
                </Box>
              )}
            </SortableContext>
          </Column>
        );
      })}
    </Box>
  );
}
