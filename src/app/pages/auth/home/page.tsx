'use client';

import View from '@/components/digital/View';
import { Box, Card } from '@mui/material';

const { Header, Body } = View;

export default function Home() {
  return (
    <View>
      <Header title="Home" />
      <Body>
        <Card sx={{ padding: 2, width: '30%', height: '250px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px' }}>HOME</Box>
        </Card>
      </Body>
    </View>
  );
}
