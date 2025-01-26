import { FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { CreateProject, Namespaces } from './components';
import { Login } from './components/Login';
import { Layout } from '@components/Layout';
import { Home } from './components/Home';
import { Templates } from './components/Templates';
import { Namespace } from './components/Namespace';
import { Projects } from './components/Projects';
import { Project } from './components/Project';

export const routes = [
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
        path: '/namespaces/:namespace_slug',
        element: <Namespace />,
      },
      {
        path: '/namespaces/:namespace_slug/projects',
        element: <Projects />,
      },
      {
        path: '/namespaces/:namespace_slug/projects/create',
        element: <CreateProject />,
      },
      {
        path: '/namespaces/:namespace_slug/projects/:project_slug',
        element: <Project />,
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
];

const router = createBrowserRouter(routes, {
  future: {
    // включаем функционал будущих версий для более легкого обновления в дальнейшем
    // https://reactrouter.com/en/6.28.0/upgrading/future#future-flags
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true,
    v7_relativeSplatPath: true,
  },
});

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
