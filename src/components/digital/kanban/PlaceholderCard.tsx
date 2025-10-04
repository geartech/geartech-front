'use client';
import { Card } from '@mui/material';

export default function PlaceholderCard() {
  return (
    <Card
      sx={{
        mb: 1.5,
        border: '2px dashed',
        borderColor: 'divider',
        background: 'transparent',
        height: 44,
      }}
    />
  );
}
