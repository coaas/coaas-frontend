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
    <div className="mt-4 text-center">
      <Button onClick={handleClick}>
        {isLoading ? 'Logging out...' : 'Log out'}
      </Button>
    </div>
  );
};
