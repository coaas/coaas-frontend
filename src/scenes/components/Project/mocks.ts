import { tourMode } from '../../../utils/tourMode';

// Mock data for a single project
export const getProjectMockData = async (): Promise<{
  id: string;
  slug: string;
  name: string;
  description: string;
  members_count: number;
  created_at: string;
}> => {
  // Shorter delay in tour mode for better UX
  const delay = tourMode.isActive() ? 100 : 300;
  await new Promise(resolve => setTimeout(resolve, delay));

  return {
    id: 'demo-project-id',
    slug: 'core-api',
    name: 'Core API',
    description: 'Core API microservices',
    members_count: 5,
    created_at: new Date('2024-01-15').toISOString(),
  };
};
