import { Navbar } from './Navbar';
import { UserMenu } from './UserMenu';

export const Header = () => {
  return (
    <header className="p-3 w-full min-h-[57px] border-b-stroke-gray dark:border-b-stroke-gray border-b-stroke-gray-light-default border-b-[1.5px] flex items-center justify-between bg-background dark:bg-background bg-white transition-colors duration-300">
      <Navbar />
      <UserMenu />
    </header>
  );
};
