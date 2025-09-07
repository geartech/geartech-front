'use client';

import PageLayout from '@/components/digital/PageLayout';
import { geartechApi } from '@/core/sdk';
import { Box, Card } from '@mui/material';

const { Header, Body } = PageLayout;

export default function ProjectList() {
  function handleList() {
    
      
  }

  return (
    <PageLayout>
      <Header title="PROJECT LIST" />
      <Body>
        <Card sx={{ padding: 2, width: '30%', height: '250px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px' }}>
            PROJECT LIST
          </Box>
        </Card>
      </Body>
    </PageLayout>
  );
}
