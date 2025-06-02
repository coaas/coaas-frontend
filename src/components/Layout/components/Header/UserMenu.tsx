import { Icon, IconType } from '@components/Icon';
import { Popover } from '@components/Popover';
import { ThemeToggle } from '@components/ThemeToggle';
import { useToggle } from '@utils/lib/use-toggle';
import { LogoutUser } from '@scenes/components/Logout/api';
import { useState } from 'react';

export const UserMenu = () => {
  const { state, off, setState } = useToggle();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await LogoutUser();
    setIsLoggingOut(false);
    off();
  };

  return (
    <div className="flex items-center gap-2">
      {/* Переключатель темы */}
      <ThemeToggle />

      {/* Меню пользователя */}
      <Popover
        open={state}
        close={off}
        setOpen={setState}
        offsetNum={8}
        passWidth={false}
        render={({ close }) => (
          <div className="py-2 z-10 border-stroke-gray-dark dark:border-stroke-gray-dark border-gray-300 border-[1.5px] rounded-lg bg-background dark:bg-background bg-white shadow-card-light dark:shadow-none min-w-[120px]">
            <button
              onClick={() => {
                close();
                handleLogout();
              }}
              disabled={isLoggingOut}
              className="w-full px-4 py-2 text-left text-[15px] leading-5 text-gray dark:text-gray text-gray-700 hover:bg-area-dark dark:hover:bg-area-dark hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoggingOut ? 'Logging out...' : 'Logout'}
            </button>
          </div>
        )}
      >
        <button className="flex items-center justify-center p-2 rounded-lg hover:bg-area-dark dark:hover:bg-area-dark hover:bg-gray-100 transition-colors">
          <Icon type={IconType.menu} props={{ size: 20 }} />
        </button>
      </Popover>
    </div>
  );
};
