import { FC } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@utils/styles';

interface TeamMemberCardProps {
  member: {
    id: string;
    user: {
      id: string;
      first_name: string;
      last_name: string;
      username: string;
      email: string;
    };
  };
  className?: string;
}

export const TeamMemberCard: FC<TeamMemberCardProps> = ({ member, className }) => {
  const { user } = member;
  const fullName = `${user.first_name} ${user.last_name}`.trim();
  const displayName = fullName || user.username;
  
  // Генерируем аватар из первых букв имени
  const getInitials = () => {
    if (user.first_name && user.last_name) {
      return `${user.first_name[0]}${user.last_name[0]}`.toUpperCase();
    }
    if (user.username) {
      return user.username.slice(0, 2).toUpperCase();
    }
    return 'U';
  };

  return (
    <div className={cn(
      'rounded-xl border border-stroke-gray-dark bg-area-dark p-6 hover:shadow-card hover:border-stroke-blue transition-all duration-200 cursor-pointer h-48 flex flex-col items-center justify-center text-center',
      className
    )}>
      {/* Аватар */}
      <div className="size-16 rounded-full bg-blue flex items-center justify-center text-white font-medium text-lg mb-4">
        {getInitials()}
      </div>
      
      {/* Информация о пользователе */}
      <div className="w-full">
        <div className="text-base font-semibold text-white truncate mb-1">
          {displayName}
        </div>
        <Link 
          to={`/profile/${user.username}`}
          className="text-sm text-gray hover:text-blue transition-colors duration-200 truncate mb-1 block"
        >
          @{user.username}
        </Link>
        <div className="text-xs text-gray truncate">
          {user.email}
        </div>
      </div>
    </div>
  );
}; 