import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Icon, IconType } from '@components/Icon';
import { api } from '@api/constants';
import { getPublicUserData } from '@api/queries';

interface ErrorResponse {
  code: string;
  default: string;
  kwargs: Record<string, unknown>;
}

export const PublicProfile: FC = () => {
  const { username } = useParams<{ username: string }>();

  const { data: userData, isLoading, error } = useQuery({
    queryKey: ['publicUserData', username],
    queryFn: async () => {
      const response = await api.post(getPublicUserData.endpoint, {
        json: { username },
      });
      
      if (!response.ok) {
        const errorData = await response.json() as ErrorResponse;
        if (errorData.code === 'USER_NOT_FOUND') {
          throw new Error('USER_NOT_FOUND');
        }
        throw new Error(errorData.default || 'Failed to fetch user data');
      }
      
      return response.json<{ username: string }>();
    },
    enabled: !!username,
    retry: false,
    retryOnMount: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-20 w-20 rounded-full bg-area mb-4"></div>
            <div className="h-8 w-48 bg-area rounded mb-2"></div>
            <div className="h-4 w-32 bg-area rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error instanceof Error) {
    return (
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-area-dark rounded-lg shadow-card p-6 border-[1.5px] border-stroke-gray-dark">
            <div className="flex items-center gap-4">
              <Icon type={IconType.user} props={{ size: 24, color: '#507EF5' }} />
              <h2 className="text-xl font-semibold text-white">User not found</h2>
            </div>
            <p className="mt-4 text-gray-400">The user @{username} does not exist or has been removed.</p>
          </div>
        </div>
      </div>
    );
  }

  if (!userData) {
    return null;
  }

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="size-20 rounded-full bg-area flex items-center justify-center">
            <Icon type={IconType.user} props={{ size: 40, color: '#507EF5' }} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">@{userData.username}</h1>
            <p className="text-gray-400">Public Profile</p>
          </div>
        </div>

        <div className="bg-area-dark rounded-lg shadow-card p-6 border-[1.5px] border-stroke-gray-dark">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Icon type={IconType.user} props={{ size: 20, color: '#507EF5' }} />
            Public Information
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Username</label>
              <div className="text-white bg-area p-2 rounded-md">{userData.username}</div>
            </div>
            
            <div className="text-gray-400">
              <p>First name, last name, and email are confidential information and are not publicly available.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 