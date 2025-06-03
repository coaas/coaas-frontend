import { Navbar } from './Navbar';
import { ThemeToggle } from '@components/ThemeToggle';
import { Icon, IconType } from '@components/Icon';
import { LogoutUser } from '@scenes/components/Logout/api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RouteMap } from '../types';

export const Header = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await LogoutUser();
      // Переходим на страницу логина через React Router
      navigate(RouteMap.login);
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="p-3 w-full min-h-[57px] border-b-stroke-gray dark:border-b-stroke-gray border-b-stroke-gray-light-default border-b-[1.5px] flex items-center justify-between bg-background dark:bg-background bg-white transition-colors duration-300">
      <Navbar />
      <div className="flex items-center gap-2">
        {/* Переключатель темы */}
        <ThemeToggle />

        {/* Кнопка logout */}
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex items-center justify-center p-2 rounded-lg hover:bg-area-dark dark:hover:bg-area-dark hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title={isLoggingOut ? 'Logging out...' : 'Logout'}
        >
          <Icon
            type={IconType.logout}
            props={{ size: 20, color: isLoggingOut ? '#B6B6B6' : '#507EF5' }}
          />
        </button>
      </div>
    </header>
  );
};
