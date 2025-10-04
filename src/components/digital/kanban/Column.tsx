'use client';
import { useDroppable } from '@dnd-kit/core';
import { Box, Paper, Typography } from '@mui/material';

export default function ColumnBox({
  droppableId,
  title,
  children,
}: {
  droppableId: string;
  title: string;
  children: React.ReactNode;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: droppableId });

  return (
    <Paper
      sx={{
        p: 1.5,
        minHeight: 160,
        display: 'flex',
        flexDirection: 'column',
        bgcolor: isOver ? 'action.hover' : 'background.paper',
        transition: 'background-color 120ms ease',
        overflow: 'visible',
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{ mb: 1 }}
      >
        {title}
      </Typography>
      <Box
        ref={setNodeRef}
        sx={{ flex: 1, minHeight: 60, overflow: 'visible' }}
      >
        {children}
      </Box>
    </Paper>
  );
}
