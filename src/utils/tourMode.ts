// Tour Mode Management System
const TOUR_MODE_KEY = 'cloudops_tour_mode';

export const tourMode = {
  // Enable tour mode
  enable: () => {
    localStorage.setItem(TOUR_MODE_KEY, 'true');
    window.dispatchEvent(new Event('tourModeChanged'));
  },

  // Disable tour mode
  disable: () => {
    localStorage.removeItem(TOUR_MODE_KEY);
    window.dispatchEvent(new Event('tourModeChanged'));
  },

  // Check if tour mode is active
  isActive: () => {
    return localStorage.getItem(TOUR_MODE_KEY) === 'true';
  },

  // Subscribe to tour mode changes
  subscribe: (callback: (isActive: boolean) => void) => {
    const handler = () => callback(tourMode.isActive());
    window.addEventListener('tourModeChanged', handler);
    return () => window.removeEventListener('tourModeChanged', handler);
  },
};

// Mock data for tour mode
export const mockData = {
  namespaces: [
    {
      id: 'tour-demo',
      slug: 'tour-demo-workspace',
      name: 'Tour Demo Workspace',
      description: 'Demo workspace created during the platform tour',
      created_at: '2024-01-22T10:00:00Z',
      updated_at: '2024-01-25T14:30:00Z',
      projects_count: 3,
      members_count: 1,
      status: 'active' as const,
      owner: {
        id: '1',
        username: 'tour_user',
        email: 'tour@example.com',
      },
    },
    {
      id: '1',
      slug: 'production-env',
      name: 'Production Environment',
      description: 'Main production workspace for live applications',
      created_at: '2024-01-15T10:30:00Z',
      updated_at: '2024-01-20T14:45:00Z',
      projects_count: 8,
      members_count: 12,
      status: 'active' as const,
      owner: {
        id: '1',
        username: 'john_doe',
        email: 'john@company.com',
      },
    },
    {
      id: '2',
      slug: 'staging-env',
      name: 'Staging Environment',
      description: 'Pre-production testing and staging workspace',
      created_at: '2024-01-10T09:15:00Z',
      updated_at: '2024-01-18T16:20:00Z',
      projects_count: 5,
      members_count: 8,
      status: 'active' as const,
      owner: {
        id: '2',
        username: 'jane_smith',
        email: 'jane@company.com',
      },
    },
    {
      id: '3',
      slug: 'development',
      name: 'Development',
      description: 'Development workspace for ongoing projects',
      created_at: '2024-01-05T11:00:00Z',
      updated_at: '2024-01-22T13:30:00Z',
      projects_count: 15,
      members_count: 25,
      status: 'active' as const,
      owner: {
        id: '1',
        username: 'john_doe',
        email: 'john@company.com',
      },
    },
    {
      id: '4',
      slug: 'testing-lab',
      name: 'Testing Lab',
      description: 'Experimental workspace for testing new features',
      created_at: '2024-01-12T15:45:00Z',
      updated_at: '2024-01-19T10:15:00Z',
      projects_count: 3,
      members_count: 6,
      status: 'active' as const,
      owner: {
        id: '3',
        username: 'mike_wilson',
        email: 'mike@company.com',
      },
    },
  ],

  projects: [
    {
      id: '1',
      slug: 'web-app',
      name: 'Web Application',
      description: 'Main web application frontend and backend',
      created_at: '2024-01-20T10:30:00Z',
      updated_at: '2024-01-25T14:45:00Z',
      services_count: 5,
      members_count: 4,
      status: 'active' as const,
      namespace_slug: 'tour-demo-workspace',
    },
    {
      id: '2',
      slug: 'api-gateway',
      name: 'API Gateway',
      description: 'Central API gateway for microservices',
      created_at: '2024-01-18T09:15:00Z',
      updated_at: '2024-01-24T16:20:00Z',
      services_count: 3,
      members_count: 3,
      status: 'active' as const,
      namespace_slug: 'tour-demo-workspace',
    },
    {
      id: '3',
      slug: 'data-processing',
      name: 'Data Processing',
      description: 'Data processing and analytics pipeline',
      created_at: '2024-01-16T11:00:00Z',
      updated_at: '2024-01-23T13:30:00Z',
      services_count: 7,
      members_count: 6,
      status: 'active' as const,
      namespace_slug: 'tour-demo-workspace',
    },
  ],

  services: [
    {
      id: '1',
      name: 'Frontend App',
      description: 'React frontend application',
      status: 'running' as const,
      image: 'nginx:alpine',
      created_at: '2024-01-22T10:30:00Z',
      project_slug: 'web-app',
      namespace_slug: 'tour-demo-workspace',
    },
    {
      id: '2',
      name: 'Backend API',
      description: 'Node.js REST API server',
      status: 'running' as const,
      image: 'node:18-alpine',
      created_at: '2024-01-22T11:00:00Z',
      project_slug: 'web-app',
      namespace_slug: 'tour-demo-workspace',
    },
    {
      id: '3',
      name: 'Database',
      description: 'PostgreSQL database',
      status: 'running' as const,
      image: 'postgres:15',
      created_at: '2024-01-22T11:30:00Z',
      project_slug: 'web-app',
      namespace_slug: 'tour-demo-workspace',
    },
  ],

  // Mock data for new namespace creation
  createNamespace: (name: string, description: string) => {
    const newNamespace = {
      id: Date.now().toString(),
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      description,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      projects_count: 0,
      members_count: 1,
      status: 'active' as const,
      owner: {
        id: '1',
        username: 'current_user',
        email: 'user@company.com',
      },
    };

    // Simulate API delay
    return new Promise(resolve => {
      setTimeout(() => {
        mockData.namespaces.unshift(newNamespace);
        resolve(newNamespace);
      }, 1000);
    });
  },

  // Mock data for new project creation
  createProject: (
    name: string,
    description: string,
    namespace_slug: string,
  ) => {
    const newProject = {
      id: Date.now().toString(),
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      description,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      services_count: 0,
      members_count: 1,
      status: 'active' as const,
      namespace_slug,
    };

    return new Promise(resolve => {
      setTimeout(() => {
        mockData.projects.unshift(newProject);
        resolve(newProject);
      }, 1000);
    });
  },

  // Mock data for new service creation
  createService: (
    name: string,
    description: string,
    image: string,
    project_slug: string,
    namespace_slug: string,
  ) => {
    const newService = {
      id: Date.now().toString(),
      name,
      description,
      status: 'deploying' as 'deploying' | 'running',
      image,
      created_at: new Date().toISOString(),
      project_slug,
      namespace_slug,
    };

    return new Promise(resolve => {
      setTimeout(() => {
        mockData.services.unshift(newService as any);
        // Simulate deployment completion
        setTimeout(() => {
          newService.status = 'running';
        }, 2000);
        resolve(newService);
      }, 1000);
    });
  },

  // Get current demo namespace for tour
  getDemoNamespace: () => {
    return (
      mockData.namespaces.find(ns => ns.slug === 'tour-demo-workspace') ||
      mockData.namespaces[0]
    );
  },

  // Get projects for demo namespace
  getDemoProjects: () => {
    return mockData.projects.filter(
      p => p.namespace_slug === 'tour-demo-workspace',
    );
  },

  // Get services for demo project
  getDemoServices: () => {
    return mockData.services.filter(
      s =>
        s.namespace_slug === 'tour-demo-workspace' &&
        s.project_slug === 'web-app',
    );
  },
};

// Mock data for deploy during tour
export const mockDeployData = {
  type: 0, // ClusterType.REGIONS
  orchestration_engine: 1, // OrchEngine.KUBERNETES
  clusters: [
    {
      id: 'cluster-ru-central1',
      name: 'Russia (Moscow)',
      region: 'ru-central1',
      availability_zone: 'ru-central1-a',
      provider: 'Yandex Cloud',
      country: 'Russia',
      city: 'Moscow',
      address: 'Yandex DC Moscow',
      servers: [
        {
          id: 'srv-tour-1',
          region: 'ru-central1',
          availability_zone: 'ru-central1-a',
          provider: 'Yandex Cloud',
          type: 1,
          name: 'web-app-node-1',
          ip: '10.128.0.10',
          cpu: 4,
          ram: 8192,
          disk: 100,
          status: 1, // Running
          instances: [
            {
              id: 'inst-tour-1',
              service: {
                id: 'svc-frontend',
                name: 'Frontend App',
                description: 'React frontend application',
              },
              status: 1,
              cpu: 1,
              ram: 2048,
              memory: 2048,
            },
            {
              id: 'inst-tour-2',
              service: {
                id: 'svc-backend',
                name: 'Backend API',
                description: 'Node.js REST API server',
              },
              status: 1,
              cpu: 2,
              ram: 4096,
              memory: 4096,
            },
          ],
        },
        {
          id: 'srv-tour-2',
          region: 'ru-central1',
          availability_zone: 'ru-central1-b',
          provider: 'Yandex Cloud',
          type: 1,
          name: 'database-node-1',
          ip: '10.128.0.11',
          cpu: 2,
          ram: 4096,
          disk: 100,
          status: 1, // Running
          instances: [
            {
              id: 'inst-tour-3',
              service: {
                id: 'svc-database',
                name: 'PostgreSQL',
                description: 'PostgreSQL database',
              },
              status: 1,
              cpu: 2,
              ram: 4096,
              memory: 4096,
            },
          ],
        },
      ],
    },
    {
      id: 'cluster-eu-west1',
      name: 'Europe (Frankfurt)',
      region: 'eu-west1',
      availability_zone: 'eu-west1-a',
      provider: 'Google Cloud',
      country: 'Germany',
      city: 'Frankfurt',
      address: 'Google Cloud Frankfurt',
      servers: [
        {
          id: 'srv-tour-3',
          region: 'eu-west1',
          availability_zone: 'eu-west1-a',
          provider: 'Google Cloud',
          type: 1,
          name: 'backup-node-1',
          ip: '10.132.0.10',
          cpu: 2,
          ram: 4096,
          disk: 50,
          status: 1, // Running
          instances: [
            {
              id: 'inst-tour-4',
              service: {
                id: 'svc-backup',
                name: 'Backup Service',
                description: 'Data backup and replication',
              },
              status: 1,
              cpu: 1,
              ram: 2048,
              memory: 2048,
            },
          ],
        },
      ],
    },
  ],
};

// Hook for using tour mode in components
import { useState, useEffect } from 'react';

export const useTourMode = () => {
  const [isActive, setIsActive] = useState(tourMode.isActive());

  useEffect(() => {
    const unsubscribe = tourMode.subscribe(setIsActive);
    return unsubscribe;
  }, []);

  return {
    isActive,
    enable: tourMode.enable,
    disable: tourMode.disable,
    mockData,
  };
};
