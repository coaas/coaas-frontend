import { FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { CreateProject, Namespaces } from './components';
import { Login } from './components/Login';
import { RegisterForm } from './components/RegisterForm';
import { Layout } from '@components/Layout';
import { Home } from './components/Home';
import { Templates } from './components/Templates';
import { Namespace } from './components/Namespace';
import { Projects } from './components/Projects';
import { Project } from './components/Project';
import { RouteMap } from '@components/Layout/components/types';
import {
  CreateTemplateLayout,
  DockerImageStep,
  MapperStep,
  SettingsStep,
} from './components/CreateTemplate';
import { InfoStep } from './components/CreateTemplate/widgets/InfoStep';

export const routes = [
  {
    element: <Layout />,
    children: [
      {
        path: RouteMap.home,
        element: <Home />,
      },
      {
        path: RouteMap.namespaces,
        element: <Namespaces />,
      },
      {
        path: RouteMap.namespace,
        element: <Namespace />,
      },
      {
        path: RouteMap.projects,
        element: <Projects />,
      },
      {
        path: RouteMap.createProject,
        element: <CreateProject />,
      },
      {
        path: RouteMap.project,
        element: <Project />,
      },
      {
        path: RouteMap.templates,
        element: <Templates />,
      },
      {
        element: <CreateTemplateLayout />,
        children: [
          { path: RouteMap.templatesCreateStepInfo, element: <InfoStep /> },
          {
            path: RouteMap.templatesCreateStepImage,
            element: <DockerImageStep />,
          },
          {
            path: RouteMap.templatesCreateStepSettings,
            element: <SettingsStep />,
          },
          { path: RouteMap.templatesCreateStepMapper, element: <MapperStep /> },
        ],
      },
      {
        path: RouteMap.login,
        element: <Login />,
      },
      {
        path: RouteMap.register,
        element: <RegisterForm />,
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
