import { Icon, IconType } from '@components/Icon';
import { Popover } from '@components/Popover';
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
    <Popover
      open={state}
      close={off}
      setOpen={setState}
      offsetNum={8}
      passWidth={false}
      render={({ close }) => (
        <div
          className="py-2 z-10 border-stroke-gray-dark border-[1.5px] rounded-lg bg-background min-w-[120px]"
        >
          <button
            onClick={() => {
              close();
              handleLogout();
            }}
            disabled={isLoggingOut}
            className="w-full px-4 py-2 text-left text-[15px] leading-5 text-gray hover:bg-area-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoggingOut ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      )}
    >
      <button className="flex items-center justify-center p-2 rounded-lg hover:bg-area-dark transition-colors">
        <Icon type={IconType.menu} props={{ size: 20 }} />
      </button>
    </Popover>
  );
}; 