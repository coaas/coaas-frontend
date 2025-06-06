import { FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import {
  CreateProject,
  CreateService,
  CreateServiceCategory,
  CreateServiceForm,
  Namespaces,
  Services,
  Service,
  Staff,
  StaffInvitations,
  NotFound,
  Profile,
  PublicProfile,
  ProjectTeam,
  TemplateDraft,
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
  CreateTemplateDraftLayout,
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
import { ErrorProvider } from '@global/ErrorContext';
import { ErrorToastManager } from '@components/ErrorToastManager';
import { ThemeDemo } from '@components/ThemeDemo';

export const routes = [
  {
    path: '*',
    element: <NotFound />,
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
        path: RouteMap.themeDemo,
        element: <ThemeDemo />,
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
        path: '/namespaces/:namespace_slug/projects/:project_slug/team',
        element: <ProjectTeam />,
      },
      {
        path: RouteMap.service,
        element: <Service />,
      },
      {
        path: '/namespaces/:namespace_slug/projects/:project_slug/services/new/categories',
        element: <CreateService />,
      },
      {
        path: '/namespaces/:namespace_slug/projects/:project_slug/services/new/categories/:category_slug',
        element: <CreateServiceCategory />,
      },
      {
        path: '/namespaces/:namespace_slug/projects/:project_slug/services/new/:template_id',
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
      { path: RouteMap.templateDraft, element: <TemplateDraft /> },
      {
        element: <CreateTemplateDraftLayout state={StateType.DRAFT} />,
        children: [
          {
            path: RouteMap.templatesDraftCreateStepInfo,
            element: <InfoStep />,
          },
          {
            path: RouteMap.templatesDraftCreateStepImage,
            element: <DockerImageStep />,
          },
          {
            path: RouteMap.templatesDraftCreateStepSettings,
            element: <SettingsStep />,
          },
          {
            path: RouteMap.templatesDraftCreateStepMapper,
            element: <MapperStep />,
          },
        ],
      },
      {
        path: RouteMap.profile,
        element: <Profile />,
      },
      {
        path: '/profile/:username',
        element: <PublicProfile />,
      },
    ],
  },
];

const router = createBrowserRouter(routes, {
  future: {
    // enable future version functionality for easier updates later
    // https://reactrouter.com/en/6.28.0/upgrading/future#future-flags
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true,
    v7_relativeSplatPath: true,
  },
});

export const Scenes: FC = () => (
  <ErrorProvider>
    <RouterProvider
      router={router}
      // enable future version functionality for easier updates later
      // https://reactrouter.com/en/6.28.0/upgrading/future#future-flags
      future={{
        v7_startTransition: true,
      }}
    />
    <ErrorToastManager />
  </ErrorProvider>
);
