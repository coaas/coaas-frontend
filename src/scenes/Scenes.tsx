import { FC } from 'react';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';

import { Namespaces } from './components';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Navigate to="/namespaces" replace />,
    },
    {
      path: '/namespaces',
      element: <Namespaces />,
    },
  ],
  {
    future: {
      // включаем функционал будущих версий для более легкого обновления в дальнейшем
      // https://reactrouter.com/en/6.28.0/upgrading/future#future-flags
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
      v7_relativeSplatPath: true,
    },
  },
);

export const Scenes: FC = () => (
  <RouterProvider
    router={router}
    // включаем функционал будущих версий для более легкого обновления в дальнейшем
    // https://reactrouter.com/en/6.28.0/upgrading/future#future-flags
    future={{
      v7_startTransition: true,
    }}
  />
);
