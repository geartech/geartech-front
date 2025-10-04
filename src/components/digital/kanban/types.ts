export type Task = { id: string; title: string };
export type ColumnId = 'todo' | 'doing' | 'done';

export type Project = {
  id: number;
  code: string;
  name: string;
  owner?: string;
  columns: Record<ColumnId, Task[]>;
};
