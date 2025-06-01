import { FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import {
  CreateProject,
  CreateService,
  CreateServiceCategory,
  CreateServiceForm,
  Namespaces,
  Services,
  Staff,
  StaffInvitations,
} from './components';
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
import { InfoStep } from '@scenes/components/CreateTemplate';
import { StateType } from '@globalTypes/templates.draft';
import { NotificationProvider } from '@components/Notification';
import { Template } from './components/Template';
import { Logout } from './components/Logout';
import { CurrentUserTemplates } from './components/CurrentUserTemplates';
import { Deploy } from '@scenes/components/Deploy';

export const routes = [
  {
    element: (
      <NotificationProvider>
        <Layout />
      </NotificationProvider>
    ),
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
        path: '/namespaces/:namespace_slug/staff',
        element: <Staff />,
      },
      {
        path: '/namespaces/:namespace_slug/invitations',
        element: <StaffInvitations />,
      },
      {
        path: '/namespaces/:namespace_slug/projects',
        element: <Projects />,
      },
      {
        path: '/namespaces/:namespace_slug/projects/:project_slug/services',
        element: <Services />,
      },
      {
        path: '/namespaces/:namespace_slug/projects/:project_slug/services/new',
        element: <CreateService />,
      },
      {
        path: '/namespaces/:namespace_slug/projects/:project_slug/services/new/:category_slug',
        element: <CreateServiceCategory />,
      },
      {
        path: '/namespaces/:namespace_slug/projects/:project_slug/services/new/:category_slug/:template_id',
        element: <CreateServiceForm />,
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
        path: RouteMap.currentUserTemplates,
        element: <CurrentUserTemplates />,
      },
      {
        path: RouteMap.deploy,
        element: <Deploy />,
      },
      {
        path: RouteMap.deployedService,
        element: <Deploy type={'deployed'} />,
      },
      { path: RouteMap.template, element: <Template /> },
      {
        element: <CreateTemplateLayout state={StateType.DRAFT} />,
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
      {
        path: RouteMap.logout,
        element: <Logout />,
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
