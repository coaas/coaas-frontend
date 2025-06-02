import React, { createContext, useContext, ReactNode } from 'react';
import { useTour, TourStep } from './useTour';

const tourSteps: TourStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to CloudOps Platform! 🚀',
    description: 'Let us take you on a quick tour to show you the main features and capabilities of our cloud infrastructure management platform.',
    target: 'h1',
    position: 'bottom',
  },
  {
    id: 'sidebar',
    title: 'Main Navigation Menu',
    description: 'This is your main navigation sidebar. From here you can access all major sections of the platform: Home, Namespaces, and Templates HUB.',
    target: 'aside',
    position: 'right',
  },
  {
    id: 'namespaces-nav',
    title: 'Namespaces',
    description: 'Namespaces are organizational units that help you manage and isolate your projects, resources, and teams. Think of them as workspace containers.',
    target: 'nav a[href="/namespaces"]',
    position: 'right',
  },
  {
    id: 'templates-nav',
    title: 'Templates HUB',
    description: 'The Templates HUB is your marketplace for ready-made infrastructure templates. Browse, create, and share deployment templates for common architectures.',
    target: 'nav a[href="/templates"]',
    position: 'right',
  },
  {
    id: 'user-profile',
    title: 'User Profile & Settings',
    description: 'Access your profile settings, notifications, and account management. You can also find support center and platform settings here.',
    target: '[data-tour="user-profile"]',
    position: 'top',
  },
  {
    id: 'namespaces-page',
    title: 'Exploring Namespaces',
    description: 'Now let\'s visit the Namespaces page to see how you can organize your projects and manage your workspaces.',
    target: 'nav a[href="/namespaces"]',
    position: 'right',
    navigateTo: '/namespaces',
    waitForNavigation: true,
  },
  {
    id: 'search-and-filters',
    title: 'Your Workspaces & Search',
    description: 'Here you can see all your namespaces (workspaces). Each namespace contains projects, team members, and resources. Use the search bar to quickly find namespaces and switch between table and card views.',
    target: '[data-tour="search-section"]',
    position: 'bottom',
  },
  {
    id: 'namespace-cards',
    title: 'Namespace Information',
    description: 'Each namespace card shows key information: name, description, project count, team members, and creation date. This helps you quickly identify and manage your workspaces.',
    target: '[data-tour="namespace-grid"]',
    position: 'top',
  },
  {
    id: 'create-namespace-button',
    title: 'Create New Namespace',
    description: 'Click this button to create a new namespace. Let\'s try creating one as part of our tour! The form will open automatically.',
    target: '[data-tour="create-namespace-btn"]',
    position: 'left',
  },
  {
    id: 'namespace-form',
    title: 'Namespace Creation Form',
    description: 'Fill in the namespace details: name, description, and configuration. In tour mode, this will create a sample namespace to demonstrate the process.',
    target: '[data-tour="namespace-modal"]',
    position: 'left',
  },
  {
    id: 'namespace-navigation',
    title: 'Namespace Navigation',
    description: 'Welcome to your namespace! Notice how the sidebar navigation has changed. You now see namespace-specific options: Projects, Staff, and Billing.',
    target: 'nav',
    position: 'right',
    navigateTo: '/namespaces/tour-demo-workspace',
    waitForNavigation: true,
  },
  {
    id: 'projects-nav',
    title: 'Projects Section',
    description: 'Projects are containers for your services and applications. Each project groups related services together for better organization and management.',
    target: 'nav a[href*="/projects"]',
    position: 'right',
  },
  {
    id: 'projects-page',
    title: 'Your Projects Overview 📁',
    description: 'Here you can see all projects in this namespace. Each project can contain multiple services, configurations, and deployments. Let\'s explore the existing projects!',
    target: '[data-tour="projects-grid"]',
    position: 'top',
    navigateTo: '/namespaces/tour-demo-workspace/projects',
    waitForNavigation: true,
  },
  {
    id: 'create-project-button',
    title: 'Create New Project',
    description: 'Click this button to create a new project. Projects help you organize related services and manage them as a unit.',
    target: '[data-tour="create-project-btn"]',
    position: 'left',
  },
  {
    id: 'enter-project',
    title: 'Enter Your Project 📦',
    description: 'Now let\'s enter the "Web Application" project to see how services are managed within a project.',
    target: '[data-tour="demo-project-card"]',
    position: 'top',
  },
  {
    id: 'project-navigation',
    title: 'Project Management Hub',
    description: 'Welcome to your project! The sidebar now shows project-specific tools: Services, Configs, Secrets, Deploy, Git, Registries, and Team management.',
    target: 'nav',
    position: 'right',
    navigateTo: '/namespaces/tour-demo-workspace/projects/web-app',
    waitForNavigation: true,
  },
  {
    id: 'services-nav',
    title: 'Services - Your Applications',
    description: 'Services are the core building blocks - they represent your containerized applications, databases, and microservices.',
    target: 'nav a[href*="/services"]',
    position: 'right',
  },
  {
    id: 'create-service-button',
    title: 'Create New Service',
    description: 'Click this button to create a new service. Services can be web applications, databases, APIs, or any containerized workload.',
    target: '[data-tour="create-service-btn"]',
    position: 'left',
    navigateTo: '/namespaces/tour-demo-workspace/projects/web-app/services',
    waitForNavigation: true,
  },
  {
    id: 'service-categories',
    title: 'Service Template Categories',
    description: 'Choose from various service categories: Web Applications, Databases, Messaging systems, and more. Each category contains pre-configured templates.',
    target: '[data-tour="service-categories"]',
    position: 'top',
    navigateTo: '/namespaces/tour-demo-workspace/projects/web-app/services/new/categories',
    waitForNavigation: true,
  },
  {
    id: 'database-templates',
    title: 'Database Templates',
    description: 'Here are the available database templates: PostgreSQL, MySQL, MongoDB, Redis, and more. Each template comes with optimized configurations and best practices.',
    target: '[data-tour="database-templates"]',
    position: 'top',
  },
  {
    id: 'select-postgresql',
    title: 'Select PostgreSQL Template',
    description: 'Let\'s select PostgreSQL - a powerful, open source object-relational database system. Click on the PostgreSQL template to continue.',
    target: '[data-tour="postgresql-template"]',
    position: 'top',
  },
  {
    id: 'service-creation-form',
    title: 'Service Creation Form 🎉',
    description: 'Perfect! Now you can configure your PostgreSQL service with custom settings, environment variables, and deployment options. This is where you bring your infrastructure to life!',
    target: 'main',
    position: 'top',
    navigateTo: '/namespaces/tour-demo-workspace/projects/web-app/services/new/postgresql-template',
    waitForNavigation: true,
  },
];

interface TourContextType {
  isActive: boolean;
  currentStep: number;
  steps: TourStep[];
  isAutoMode: boolean;
  isPaused: boolean;
  speed: 'slow' | 'normal' | 'fast';
  startTour: (autoMode?: boolean) => void;
  stopTour: () => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (stepIndex: number) => void;
  toggleAutoMode: () => void;
  togglePause: () => void;
  setSpeed: (speed: 'slow' | 'normal' | 'fast') => void;
  currentStepData: TourStep | undefined;
  isLastStep: boolean;
  isFirstStep: boolean;
}

const TourContext = createContext<TourContextType | undefined>(undefined);

export const useTourContext = () => {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error('useTourContext must be used within a TourProvider');
  }
  return context;
};

interface TourProviderProps {
  children: ReactNode;
}

export const TourProvider: React.FC<TourProviderProps> = ({ children }) => {
  const tour = useTour(tourSteps);

  return (
    <TourContext.Provider value={tour}>
      {children}
    </TourContext.Provider>
  );
}; 