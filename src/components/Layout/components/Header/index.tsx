import { Navbar } from './Navbar';
import { UserMenu } from './UserMenu';

export const Header = () => {
  return (
    <header className="p-3 w-full min-h-[57px] border-b-stroke-gray border-b-[1.5px] flex items-center justify-between">
      <Navbar />
      <UserMenu />
    </header>
  );
};
