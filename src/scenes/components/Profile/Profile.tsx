import { FC } from 'react';
import { useUser } from '@utils/lib/use-user';

export const Profile: FC = () => {
  const userData = useUser();

  if (!userData) {
    return null;
  }

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Profile</h1>
        
        <div className="bg-area-dark rounded-lg shadow-card p-6 border-[1.5px] border-stroke-gray-dark">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Username</label>
              <div className="text-white">{userData.username}</div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">First Name</label>
              <div className="text-white">{userData.first_name}</div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Last Name</label>
              <div className="text-white">{userData.last_name}</div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
              <div className="text-white">{userData.email || 'Not provided'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 