import { Outlet } from 'react-router';
import { Header, Sidebar } from './components';

export const Layout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className=" w-full max-w-[1560px] flex flex-col">
        <Header />
        <div className="max-h-full overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
