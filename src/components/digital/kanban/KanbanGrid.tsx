'use client';

import { Fragment, useMemo, useState } from 'react';

import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { Box, Divider, Stack } from '@mui/material';

import type { Project, Task, ColumnId } from '../kanban/types';
import { findTaskLocation, parseDroppableId } from '../kanban/utils';
import ServiceOrderRow from './ServiceOrderRow';
import DragCardOverlay from '../kanban/DragCardOverlay';

export default function KanbanGrid({
  initialProjects,
  onChange,
  restrictToSameProject = true,
}: {
  initialProjects: Project[];
  title?: string;
  onChange?: (projects: Project[]) => void;
  restrictToSameProject?: boolean;
}) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  const activeTask: Task | undefined = useMemo(() => {
    if (!activeId) return undefined;
    for (const p of projects) {
      for (const col of ['todo', 'doing', 'done'] as ColumnId[]) {
        const found = p.columns[col].find((t) => t.id === activeId);
        if (found) return found;
      }
    }
    return undefined;
  }, [activeId, projects]);

  const { pIndex: activePIndex, columnId: activeColId } = (activeId && findTaskLocation(projects, activeId)) || {};

  const handleDragStart = (e: DragStartEvent) => setActiveId(String(e.active.id));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    if (!over) return;

    const src = findTaskLocation(projects, String(active.id));
    if (!src) return;

    // Calcular destino (pode ser outra task OU a própria coluna)
    let dstProjectIndex = src.pIndex;
    let dstColumnId: ColumnId = src.columnId;
    let dstIndex: number | null = null;

    const overTask = findTaskLocation(projects, String(over.id));
    if (overTask) {
      dstProjectIndex = overTask.pIndex;
      dstColumnId = overTask.columnId;
      dstIndex = overTask.tIndex; // insere antes desta task
    } else {
      const parsed = parseDroppableId(String(over.id));
      if (!parsed) return;
      dstProjectIndex = projects.findIndex((p) => String(p.id) === parsed.projectId);
      dstColumnId = parsed.columnId;
      dstIndex = null; // fim da coluna
    }

    if (dstProjectIndex < 0) return;

    // opcional: restringir a mover dentro do mesmo projeto/linha
    if (restrictToSameProject && dstProjectIndex !== src.pIndex) return;

    setProjects((prev) => {
      // cópias rasas seguras das colunas
      const next = prev.map((p) => ({
        ...p,
        columns: {
          todo: [...p.columns.todo],
          doing: [...p.columns.doing],
          done: [...p.columns.done],
        },
      }));

      const srcProj = next[src.pIndex];
      const dstProj = next[dstProjectIndex];

      // === MESMA COLUNA: usar somente arrayMove (NÃO remova antes) ===
      if (src.pIndex === dstProjectIndex && src.columnId === dstColumnId) {
        const arr = dstProj.columns[src.columnId];
        const toIndex = dstIndex === null ? arr.length - 1 : dstIndex;
        dstProj.columns[src.columnId] = arrayMove(arr, src.tIndex, toIndex);
        onChange?.(next);
        return next;
      }

      // === COLUNAS DIFERENTES: remover da origem e inserir no destino ===
      const [moved] = srcProj.columns[src.columnId].splice(src.tIndex, 1);
      const destArr = dstProj.columns[dstColumnId];
      const insertAt = dstIndex === null ? destArr.length : dstIndex;
      destArr.splice(insertAt, 0, moved);

      onChange?.(next);
      return next;
    });
  };

  return (
    <Box
      p={2}
      sx={{ overflow: 'visible' }}
    >
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <Stack spacing={1.5}>
          {projects.map((project) => (
            <Fragment key={project.id}>
              <ServiceOrderRow
                key={project.id}
                project={project}
                activeTaskId={activeId}
                activeInColumn={
                  activeId && activePIndex !== undefined && project.id === projects[activePIndex]?.id
                    ? (activeColId as ColumnId)
                    : null
                }
              />
              <Divider />
            </Fragment>
          ))}
        </Stack>

        <DragOverlay>
          <DragCardOverlay task={activeTask} />
        </DragOverlay>
      </DndContext>
    </Box>
  );
}
