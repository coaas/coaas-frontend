import { FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Namespaces } from './components';
import { Login } from './components/Login';
import { Layout } from '@components/Layout';
import { Home } from './components/Home';
import { Templates } from './components/Templates';

const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/namespaces',
          element: <Namespaces />,
        },
        {
          path: '/templates',
          element: <Templates />,
        },
        {
          path: '/login',
          element: <Login />,
        },
      ],
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
