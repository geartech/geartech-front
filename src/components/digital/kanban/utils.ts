import type { ColumnId, Project } from './types';

// droppable de coluna: "projectId:columnId"
export const makeDroppableId = (projectId: string, columnId: ColumnId) => `${projectId}:${columnId}`;

export const parseDroppableId = (id: number | string): { projectId: string; columnId: ColumnId } | null => {
  const [projectId, columnId] = String(id).split(':');
  if (!projectId || !columnId) return null;
  if (!['todo', 'doing', 'done'].includes(columnId)) return null;
  return { projectId, columnId: columnId as ColumnId };
};

// onde está a task?
export function findTaskLocation(
  projects: Project[],
  taskId: string
): { pIndex: number; columnId: ColumnId; tIndex: number } | null {
  for (let pIndex = 0; pIndex < projects.length; pIndex++) {
    const p = projects[pIndex];
    for (const columnId of ['todo', 'doing', 'done'] as ColumnId[]) {
      const tIndex = p.columns[columnId].findIndex((t) => t.id === taskId);
      if (tIndex >= 0) return { pIndex, columnId, tIndex };
    }
  }
  return null;
}
