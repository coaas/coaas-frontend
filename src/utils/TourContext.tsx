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
    id: 'namespaces-content',
    title: 'Your Workspaces Overview',
    description: 'Here you can see all your namespaces (workspaces). Each namespace contains projects, team members, and resources. Notice we\'re showing sample data for this tour.',
    target: 'main',
    position: 'top',
  },
  {
    id: 'search-and-filters',
    title: 'Search & Filters',
    description: 'Use the search bar to quickly find namespaces. You can also switch between table and card views to customize how you view your workspaces.',
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
    description: 'Click this button to create a new namespace. Let\'s try creating one as part of our tour!',
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
    id: 'enter-namespace',
    title: 'Enter Your New Workspace 🎯',
    description: 'Great! Now let\'s enter the newly created namespace to explore its structure and capabilities. Click on the "Tour Demo Workspace" to continue.',
    target: '[data-tour="demo-namespace-card"]',
    position: 'top',
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
    title: 'Exploring Projects',
    description: 'Let\'s visit the Projects page to see how you can organize your applications and services within a namespace.',
    target: 'nav a[href*="/projects"]',
    position: 'right',
    navigateTo: '/namespaces/tour-demo-workspace/projects',
    waitForNavigation: true,
  },
  {
    id: 'projects-overview',
    title: 'Your Projects Overview 📁',
    description: 'Here you can see all projects in this namespace. Each project can contain multiple services, configurations, and deployments.',
    target: 'main',
    position: 'top',
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
    id: 'services-page',
    title: 'Managing Services',
    description: 'Let\'s explore the Services page where you can see all running applications and create new ones.',
    target: 'nav a[href*="/services"]',
    position: 'right',
    navigateTo: '/namespaces/tour-demo-workspace/projects/web-app/services',
    waitForNavigation: true,
  },
  {
    id: 'services-overview',
    title: 'Your Running Services 🚀',
    description: 'Here are your deployed services! You can see their status, manage configurations, and monitor performance. Notice the sample services we\'ve prepared.',
    target: 'main',
    position: 'top',
  },
  {
    id: 'create-service-button',
    title: 'Create New Service',
    description: 'Ready to deploy something new? Click this button to create and deploy a new service from our template library.',
    target: '[data-tour="create-service-btn"]',
    position: 'left',
  },
  {
    id: 'deploy-nav',
    title: 'Deploy & Monitor 📊',
    description: 'The Deploy section is where you can monitor deployments, view logs, and manage the lifecycle of your services.',
    target: 'nav a[href*="/deploy"]',
    position: 'right',
  },
  {
    id: 'deploy-page',
    title: 'Deployment Dashboard',
    description: 'This is your deployment control center! Here you can monitor all deployments, view real-time status, and manage the complete application lifecycle.',
    target: 'main',
    position: 'top',
    navigateTo: '/namespaces/tour-demo-workspace/projects/web-app/deploy',
    waitForNavigation: true,
  },
  {
    id: 'tour-complete',
    title: 'Tour Complete! 🎉',
    description: 'Congratulations! You\'ve completed the full platform tour. You now understand the complete workflow: Namespaces → Projects → Services → Deploy. Ready to build something amazing?',
    target: 'main',
    position: 'top',
  },
];

interface TourContextType {
  isActive: boolean;
  currentStep: number;
  steps: TourStep[];
  startTour: () => void;
  stopTour: () => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (stepIndex: number) => void;
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