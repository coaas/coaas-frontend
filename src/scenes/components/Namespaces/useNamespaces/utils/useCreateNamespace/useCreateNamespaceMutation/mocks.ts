import { CreatedNamespace } from './types';

export const mockCreateNamespace = async (): Promise<CreatedNamespace> => {
  // симулируем задержку
  await new Promise(resolve => setTimeout(resolve, 1000));

  if (Math.random() > 0.1) { // почти всегда успех для тестирования
    return {
      id: Date.now().toString(),
      slug: 'test-namespace-' + Date.now(),
      name: 'Test Namespace',
      description: 'Mock created namespace',
      members_count: 1,
      created_at: new Date().toISOString(),
    };
  } else {
    throw new Error('Mock error');
  }
};
