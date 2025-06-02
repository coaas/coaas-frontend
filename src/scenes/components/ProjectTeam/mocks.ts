import { tourMode } from '../../../utils/tourMode';

// Mock data for project team
export const getProjectTeamMockData = async (): Promise<{
  members: Array<{
    id: string;
    user: {
      id: string;
      first_name: string;
      last_name: string;
      username: string;
      email: string;
    };
  }>;
}> => {
  // Shorter delay in tour mode for better UX
  const delay = tourMode.isActive() ? 100 : 300;
  await new Promise(resolve => setTimeout(resolve, delay));

  return {
    members: [
      {
        id: 'member-1',
        user: {
          id: 'user-1',
          first_name: 'Alex',
          last_name: 'Johnson',
          username: 'alex.johnson',
          email: 'alex.johnson@cloudops.com',
        },
      },
      {
        id: 'member-2',
        user: {
          id: 'user-2',
          first_name: 'Sarah',
          last_name: 'Chen',
          username: 'sarah.chen',
          email: 'sarah.chen@cloudops.com',
        },
      },
      {
        id: 'member-3',
        user: {
          id: 'user-3',
          first_name: 'Mike',
          last_name: 'Rodriguez',
          username: 'mike.rodriguez',
          email: 'mike.rodriguez@cloudops.com',
        },
      },
      {
        id: 'member-4',
        user: {
          id: 'user-4',
          first_name: 'Emma',
          last_name: 'Williams',
          username: 'emma.williams',
          email: 'emma.williams@cloudops.com',
        },
      },
      {
        id: 'member-5',
        user: {
          id: 'user-5',
          first_name: 'David',
          last_name: 'Kim',
          username: 'david.kim',
          email: 'david.kim@cloudops.com',
        },
      },
    ],
  };
}; 