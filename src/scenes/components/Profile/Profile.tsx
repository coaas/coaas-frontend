import { FC } from 'react';
import { useUser } from '@utils/lib/use-user';
import { Icon, IconType } from '@components/Icon';

export const Profile: FC = () => {
  const userData = useUser();

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
            <h1 className="text-3xl font-bold text-white">
              {userData.first_name} {userData.last_name}
            </h1>
            <p className="text-gray-400">@{userData.username}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-area-dark rounded-lg shadow-card p-6 border-[1.5px] border-stroke-gray-dark">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Icon
                type={IconType.user}
                props={{ size: 20, color: '#507EF5' }}
              />
              Personal Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Username
                </label>
                <div className="text-white bg-area p-2 rounded-md">
                  {userData.username}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  First Name
                </label>
                <div className="text-white bg-area p-2 rounded-md">
                  {userData.first_name}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Last Name
                </label>
                <div className="text-white bg-area p-2 rounded-md">
                  {userData.last_name}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-area-dark rounded-lg shadow-card p-6 border-[1.5px] border-stroke-gray-dark">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Icon
                type={IconType.support}
                props={{ size: 20, color: '#507EF5' }}
              />
              Contact Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Email
                </label>
                <div className="text-white bg-area p-2 rounded-md">
                  {userData.email || 'Not provided'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
