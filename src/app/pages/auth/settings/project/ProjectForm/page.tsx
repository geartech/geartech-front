'use client';

import PageLayout from '@/components/digital/PageLayout';
import { Box, Card } from '@mui/material';

const { Header, Body } = PageLayout;

export default function ProjectForm() {
  return (
    <PageLayout>
      <Header title="PROJECT FORM" />
      <Body>
        <Card sx={{ padding: 2, width: '30%', height: '250px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px' }}>
            PROJECT FORM
          </Box>
        </Card>
      </Body>
    </PageLayout>
  );
}
