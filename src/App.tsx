import { FC } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from './api';
import { Scenes } from './scenes';

export const App: FC = () => (
  <QueryClientProvider client={queryClient}>
    <Scenes />
  </QueryClientProvider>
);
