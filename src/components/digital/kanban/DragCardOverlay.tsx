'use client';
import { Card, CardContent, Typography } from '@mui/material';
import type { Task } from './types';

export default function DragCardOverlay({ task }: { task?: Task }) {
  if (!task) return null;
  return (
    <Card sx={{ boxShadow: 8, width: 280, pointerEvents: 'none' }}>
      <CardContent sx={{ py: 1.25 }}>
        <Typography variant="body2">{task.title}</Typography>
      </CardContent>
    </Card>
  );
}
