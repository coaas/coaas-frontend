import { useState } from 'react';

import { Button } from '@components/Button';

import { LogoutUser } from './api';

export const Logout = () => {
  const [isLoading, setIsLoading] = useState(false);

  async function handleClick() {
    setIsLoading(true);
    await LogoutUser();
    setIsLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-background">
      <Button onClick={handleClick}>
        {isLoading ? 'Logging out...' : 'Log out'}
      </Button>
    </div>
  );
};
