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
  }
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
        email: 'tour@example.com'
      }
    },
    {
      id: '1',
      slug: 'hse',
      name: 'HSE',
      description: 'Higher School of Economics',
      created_at: '2024-01-15T10:30:00Z',
      updated_at: '2024-01-20T14:45:00Z',
      projects_count: 8,
      members_count: 12,
      status: 'active' as const,
      owner: {
        id: '1',
        username: 'john_doe',
        email: 'john@company.com'
      }
    },
    {
      id: '2',
      slug: 'yandex',
      name: 'Yandex',
      description: 'Yandex Inc.',
      created_at: '2024-01-10T09:15:00Z',
      updated_at: '2024-01-18T16:20:00Z',
      projects_count: 5,
      members_count: 8,
      status: 'active' as const,
      owner: {
        id: '2',
        username: 'jane_smith',
        email: 'jane@company.com'
      }
    },
    {
      id: '3',
      slug: 'tbank',
      name: 'T-Bank',
      description: 'Russian bank',
      created_at: '2024-01-05T11:00:00Z',
      updated_at: '2024-01-22T13:30:00Z',
      projects_count: 15,
      members_count: 25,
      status: 'active' as const,
      owner: {
        id: '1',
        username: 'john_doe',
        email: 'john@company.com'
      }
    },
    {
      id: '4',
      slug: 'sber',
      name: 'Sber',
      description: 'Russian gov bank & IT company',
      created_at: '2024-01-12T15:45:00Z',
      updated_at: '2024-01-19T10:15:00Z',
      projects_count: 3,
      members_count: 6,
      status: 'active' as const,
      owner: {
        id: '3',
        username: 'mike_wilson',
        email: 'mike@company.com'
      }
    },
    {
      id: '5',
      slug: 'avito',
      name: 'Avito',
      description: 'Russian online marketplace',
      created_at: '2024-01-10T09:15:00Z',
      updated_at: '2024-01-18T16:20:00Z',
      projects_count: 5,
      members_count: 8,
      status: 'active' as const,
      owner: {
        id: '2',
        username: 'jane_smith',
        email: 'jane@company.com'
      }
    },
    {
      id: '6',
      slug: 'tochka-bank',
      name: 'Tochka',
      description: 'Russian bank',
      created_at: '2024-01-05T11:00:00Z',
      updated_at: '2024-01-22T13:30:00Z',
      projects_count: 15,
      members_count: 25,
      status: 'active' as const,
      owner: {
        id: '1',
        username: 'john_doe',
        email: 'john@company.com'
      }
    },
    {
      id: '7',
      slug: 'mts',
      name: 'MTS',
      description: 'Russian mobile operator',
      created_at: '2024-01-12T15:45:00Z',
      updated_at: '2024-01-19T10:15:00Z',
      projects_count: 3,
      members_count: 6,
      status: 'active' as const,
      owner: {
        id: '3',
        username: 'mike_wilson',
        email: 'mike@company.com'
      }
    }
  ],

  projects: [
    {
      id: '1',
      slug: 'api-gateway',
      name: 'API Gateway',
      description: 'API Gateway',
      created_at: '2024-01-20T10:30:00Z',
      updated_at: '2024-01-25T14:45:00Z',
      services_count: 5,
      members_count: 4,
      status: 'active' as const,
      namespace_slug: 'tour-demo-workspace'
    },
    {
      id: '2',
      slug: 'ai-assistant',
      name: 'AI Assistant',
      description: 'AI Assistant',
      created_at: '2024-01-18T09:15:00Z',
      updated_at: '2024-01-24T16:20:00Z',
      services_count: 3,
      members_count: 3,
      status: 'active' as const,
      namespace_slug: 'tour-demo-workspace'
    },
    {
      id: '3',
      slug: 'core-api',
      name: 'Core API',
      description: 'Core API',
      created_at: '2024-01-16T11:00:00Z',
      updated_at: '2024-01-23T13:30:00Z',
      services_count: 7,
      members_count: 6,
      status: 'active' as const,
      namespace_slug: 'tour-demo-workspace'
    }
  ],

  services: [
    {
      id: '1',
      name: 'Frontend App',
      description: 'React frontend application',
      created_at: '2024-01-22T10:30:00Z'
    },
    {
      id: '2',
      name: 'Backend API',
      description: 'Node.js REST API server',
      created_at: '2024-01-22T11:00:00Z'
    },
    {
      id: '3',
      name: 'PostgreSQL Database',
      description: 'PostgreSQL database service',
      created_at: '2024-01-22T11:30:00Z'
    },
    {
      id: '4',
      name: 'Redis Cache',
      description: 'Redis cache service for fast data access',
      created_at: '2024-01-22T12:00:00Z'
    },
    {
      id: '5',
      name: 'Monitoring Service',
      description: 'Application monitoring and alerting system',
      created_at: '2024-01-22T12:30:00Z'
    }
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
        email: 'user@company.com'
      }
    };

    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        mockData.namespaces.unshift(newNamespace);
        resolve(newNamespace);
      }, 1000);
    });
  },

  // Mock data for new project creation
  createProject: (name: string, description: string, namespace_slug: string) => {
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
      namespace_slug
    };

    return new Promise((resolve) => {
      setTimeout(() => {
        mockData.projects.unshift(newProject);
        resolve(newProject);
      }, 1000);
    });
  },

  // Mock data for new service creation
  createService: (name: string, description: string, image: string, project_slug: string, namespace_slug: string) => {
    const newService = {
      id: Date.now().toString(),
      name,
      description,
      status: 'deploying' as 'deploying' | 'running',
      image,
      created_at: new Date().toISOString(),
      project_slug,
      namespace_slug
    };

    return new Promise((resolve) => {
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
    return mockData.namespaces.find(ns => ns.slug === 'tour-demo-workspace') || mockData.namespaces[0];
  },

  // Get projects for demo namespace
  getDemoProjects: () => {
    return mockData.projects.filter(p => p.namespace_slug === 'tour-demo-workspace');
  },

  // Get services for demo project
  getDemoServices: () => {
    return mockData.services;
  }
};

// Mock data for deploy during tour
export const mockDeployData = {
  type: 1, // ClusterType.REGIONS
  orchestration_engine: 0, // OrchEngine.DOCKER
  clusters: [
    {
      id: "cluster-ru-central1",
      name: "Russia (Moscow)",
      region: "ru-central1",
      availability_zone: "ru-central1-a",
      provider: "Yandex Cloud",
      country: "Russia",
      city: "Moscow",
      address: "Yandex DC Moscow",
      servers: [
        {
          id: "srv-tour-1",
          region: "ru-central1",
          availability_zone: "ru-central1-a",
          provider: "Yandex Cloud",
          type: 1,
          name: "web-frontend-node",
          ip: "10.128.0.10",
          cpu: 8,
          ram: 16384,
          disk: 250,
          status: 1, // LOADED
          instances: [
            {
              id: "inst-tour-1",
              service: {
                id: "svc-frontend",
                name: "Frontend",
                description: "Main user interface and admin panel"
              },
              status: 1, // LOADED
              cpu: 2,
              ram: 4096,
              memory: 40
            },
            {
              id: "inst-tour-2",
              service: {
                id: "svc-api-gateway",
                name: "API Gateway",
                description: "Central API routing and load balancing"
              },
              status: 0, // ACTIVE
              cpu: 3,
              ram: 6144,
              memory: 60
            },
            {
              id: "inst-tour-3",
              service: {
                id: "svc-auth",
                name: "Auth Service",
                description: "OAuth2 and JWT token management"
              },
              status: 1, // LOADED
              cpu: 2,
              ram: 4096,
              memory: 40
            }
          ]
        },
        {
          id: "srv-tour-2",
          region: "ru-central1",
          availability_zone: "ru-central1-b",
          provider: "Yandex Cloud",
          type: 1,
          name: "database-cluster-primary",
          ip: "10.128.0.11",
          cpu: 8,
          ram: 32768,
          disk: 500,
          status: 0, // ACTIVE
          instances: [
            {
              id: "inst-tour-4",
              service: {
                id: "svc-postgres",
                name: "PostgreSQL",
                description: "Primary database with high availability"
              },
              status: 0, // ACTIVE
              cpu: 4,
              ram: 32768,
              memory: 32
            },
            {
              id: "inst-tour-5",
              service: {
                id: "svc-redis",
                name: "Redis Cluster",
                description: "In-memory cache and session storage"
              },
              status: 0, // ACTIVE
              cpu: 2,
              ram: 8192,
              memory: 81
            },
            {
              id: "inst-tour-6",
              service: {
                id: "svc-elasticsearch",
                name: "Elasticsearch",
                description: "Search engine and analytics platform"
              },
              status: 1, // LOADED
              cpu: 2,
              ram: 8192,
              memory: 81
            }
          ]
        },
        {
          id: "srv-tour-3",
          region: "ru-central1",
          availability_zone: "ru-central1-c",
          provider: "Yandex Cloud",
          type: 1,
          name: "microservices-node",
          ip: "10.128.0.12",
          cpu: 12,
          ram: 24576,
          disk: 300,
          status: 3, // UNKNOWN
          instances: [
            {
              id: "inst-tour-7",
              service: {
                id: "svc-notification",
                name: "Notification Service",
                description: "Email, SMS and push notifications"
              },
              status: 2, // DIED
              cpu: 1,
              ram: 3072,
              memory: 30
            },
            {
              id: "inst-tour-8",
              service: {
                id: "svc-analytics",
                name: "Analytics Engine",
                description: "Real-time data processing and metrics"
              },
              status: 0, // ACTIVE
              cpu: 2,
              ram: 8192,
              memory: 81
            },
            {
              id: "inst-tour-9",
              service: {
                id: "svc-file-storage",
                name: "File Storage API",
                description: "Document and media file management"
              },
              status: 1, // LOADED
              cpu: 3,
              ram: 6144,
              memory: 61
            },
            {
              id: "inst-tour-10",
              service: {
                id: "svc-queue",
                name: "Message Queue",
                description: "Async task processing with RabbitMQ"
              },
              status: 3, // UNKNOWN
              cpu: 3,
              ram: 6144,
              memory: 61
            }
          ]
        }
      ]
    },
    {
      id: "cluster-eu-west1",
      name: "Europe (Frankfurt)",
      region: "eu-west1",
      availability_zone: "eu-west1-a",
      provider: "AWS",
      country: "Germany",
      city: "Frankfurt",
      address: "AWS Frankfurt Data Center",
      servers: [
        {
          id: "srv-tour-4",
          region: "eu-west1",
          availability_zone: "eu-west1-a",
          provider: "AWS",
          type: 1,
          name: "backup-and-cdn-node",
          ip: "10.132.0.10",
          cpu: 8,
          ram: 16384,
          disk: 1000,
          status: 1, // LOADED
          instances: [
            {
              id: "inst-tour-11",
              service: {
                id: "svc-backup",
                name: "Backup Service",
                description: "Automated database and file backups"
              },
              status: 1, // LOADED
              cpu: 3,
              ram: 6144,
              memory: 6144
            },
            {
              id: "inst-tour-12",
              service: {
                id: "svc-cdn",
                name: "CDN Edge Server",
                description: "Content delivery and static assets"
              },
              status: 0, // ACTIVE
              cpu: 2,
              ram: 4096,
              memory: 4096
            },
            {
              id: "inst-tour-13",
              service: {
                id: "svc-monitoring",
                name: "Prometheus",
                description: "Infrastructure and application monitoring"
              },
              status: 1, // LOADED
              cpu: 3,
              ram: 6144,
              memory: 6144
            }
          ]
        },
        {
          id: "srv-tour-5",
          region: "eu-west1",
          availability_zone: "eu-west1-b",
          provider: "AWS",
          type: 1,
          name: "ml-processing-cluster",
          ip: "10.132.0.11",
          cpu: 32,
          ram: 65536,
          disk: 2000,
          status: 2, // DIED
          instances: [
            {
              id: "inst-tour-14",
              service: {
                id: "svc-ml-training",
                name: "ML Training",
                description: "Machine learning model training and optimization"
              },
              status: 0, // ACTIVE
              cpu: 8,
              ram: 14336,
              memory: 14336
            },
            {
              id: "inst-tour-15",
              service: {
                id: "svc-ml-inference",
                name: "ML Inference API",
                description: "Real-time model predictions and recommendations"
              },
              status: 2, // DIED
              cpu: 8,
              ram: 16384,
              memory: 16384
            },
            {
              id: "inst-tour-16",
              service: {
                id: "svc-gpu-compute",
                name: "GPU Compute",
                description: "CUDA-accelerated data processing"
              },
              status: 3, // UNKNOWN
              cpu: 8,
              ram: 16384,
              memory: 16384
            }
          ]
        }
      ]
    },
    {
      id: "cluster-us-east1",
      name: "US East (Virginia)",
      region: "us-east1",
      availability_zone: "us-east1-a",
      provider: "Google Cloud",
      country: "United States",
      city: "Virginia",
      address: "Google Cloud Virginia",
      servers: [
        {
          id: "srv-tour-6",
          region: "us-east1",
          availability_zone: "us-east1-a",
          provider: "Google Cloud",
          type: 1,
          name: "global-api-cluster",
          ip: "10.140.0.10",
          cpu: 16,
          ram: 32768,
          disk: 500,
          status: 0, // ACTIVE
          instances: [
            {
              id: "inst-tour-17",
              service: {
                id: "svc-global-api",
                name: "Global API Router",
                description: "Multi-region API load balancing"
              },
              status: 1, // LOADED
              cpu: 4,
              ram: 8192,
              memory: 8192
            },
            {
              id: "inst-tour-18",
              service: {
                id: "svc-payment",
                name: "Payments",
                description: "Stripe and PayPal integration service"
              },
              status: 0, // ACTIVE
              cpu: 6,
              ram: 12288,
              memory: 12288
            },
            {
              id: "inst-tour-19",
              service: {
                id: "svc-fraud-detection",
                name: "Fraud Detection AI",
                description: "Real-time transaction fraud analysis"
              },
              status: 1, // LOADED
              cpu: 6,
              ram: 12288,
              memory: 12288
            }
          ]
        },
        {
          id: "srv-tour-7",
          region: "us-east1",
          availability_zone: "us-east1-b",
          provider: "Google Cloud",
          type: 1,
          name: "data-warehouse-node",
          ip: "10.140.0.11",
          cpu: 24,
          ram: 49152,
          disk: 4000,
          status: 1, // LOADED
          instances: [
            {
              id: "inst-tour-20",
              service: {
                id: "svc-bigquery",
                name: "Analytics",
                description: "Large-scale data warehouse and analytics"
              },
              status: 0, // ACTIVE
              cpu: 12,
              ram: 24576,
              memory: 24576
            },
            {
              id: "inst-tour-21",
              service: {
                id: "svc-etl",
                name: "ETL Pipeline",
                description: "Data extraction, transformation and loading"
              },
              status: 1, // LOADED
              cpu: 8,
              ram: 16384,
              memory: 16384
            },
            {
              id: "inst-tour-22",
              service: {
                id: "svc-reporting",
                name: "Reporting",
                description: "Automated reports and dashboards"
              },
              status: 2, // DIED
              cpu: 4,
              ram: 8192,
              memory: 8192
            }
          ]
        }
      ]
    }
  ]
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
    mockData
  };
}; 