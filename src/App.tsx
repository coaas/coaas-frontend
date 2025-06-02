import { FC } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from './api';
import { Scenes } from './scenes';
import { ThemeProvider } from './global/ThemeContext';

export const App: FC = () => (
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <Scenes />
    </QueryClientProvider>
  </ThemeProvider>
);
