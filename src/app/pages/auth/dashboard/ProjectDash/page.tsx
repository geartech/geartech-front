'use client';

import PageLayout from '@/components/digital/PageLayout';
import { Box, Card } from '@mui/material';

const { Header, Body } = PageLayout;

export default function ProjectDashboard() {
  return (
    <PageLayout>
      <Header title="PROJECT DASHBOARD" />
      <Body>
        <Card sx={{ padding: 2, width: '30%', height: '250px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px' }}>
            PROJECT DASHBOARD
          </Box>
        </Card>
      </Body>
    </PageLayout>
  );
}
