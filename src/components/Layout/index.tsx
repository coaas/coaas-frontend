import { Outlet, useLocation } from 'react-router-dom'; // ?? react-router
import { Header, Sidebar } from './components';
import { useMemo } from 'react';

export const Layout = () => {
  const location = useLocation();

  const isLogin = useMemo(
    () => location.pathname === '/login',
    [location.pathname],
  );

  return (
    <div className="flex h-screen bg-background dark:bg-background bg-white transition-colors duration-300">
      {!isLogin && <Sidebar />}
      <div className="w-full max-w-[1560px] flex flex-col justify-start">
        {!isLogin && <Header />}
        <div className="h-full overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
