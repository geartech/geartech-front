'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { Fade } from '@mui/material';
import View from '../View';

type AnimatedViewProps = {
  children: ReactNode;
};

export default function AnimatedView({ children }: AnimatedViewProps) {
  const pathname = usePathname();

  return (
    <Fade
      key={pathname}
      in
      timeout={400}
    >
      <div>
        <View>{children}</View>
      </div>
    </Fade>
  );
}
