'use client';
import PageLayout from '@/components/digital/PageLayout';
import { Box, Card } from '@mui/material';

const { Header, Body } = PageLayout;

export default function Home() {
  return (
    <PageLayout>
      <Header title="Home" />
      <Body>
        <Card sx={{ padding: 2, width: '30%', height: '250px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px' }}>Teste</Box>
        </Card>
      </Body>
    </PageLayout>
  );
}
