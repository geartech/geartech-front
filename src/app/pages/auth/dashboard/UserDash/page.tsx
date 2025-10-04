'use client';

import View from '@/components/digital/View';
import { Box, Card } from '@mui/material';

const { Header, Body } = View;

export default function UserDashboard() {
  return (
    <View>
      <Header title="USER DASHBOARD" />
      <Body>
        <Card sx={{ padding: 2, width: '30%', height: '250px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px' }}>
            USER DASHBOARD
          </Box>
        </Card>
      </Body>
    </View>
  );
}
