import { CreatedProject } from './types';

export const mockCreateProject = async (): Promise<CreatedProject> => {
  // симулируем задержку
  await new Promise(resolve => setTimeout(resolve, 1000));

  if (Math.random() > 0.1) { // почти всегда успех для тестирования
    return {
      id: Date.now().toString(),
      slug: 'test-project-' + Date.now(),
      name: 'Test Project',
      description: 'Mock created project',
      members_count: 1,
      created_at: new Date().toISOString(),
    };
  } else {
    throw new Error('Mock error');
  }
};
