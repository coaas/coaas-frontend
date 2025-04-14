import { NavLink } from 'react-router-dom';
import { navLinks } from '../../constants';
import { Icon } from '@components/Icon';
import { cn } from '@utils/styles';

export const Navigation = () => {
  return (
    <nav className="p-[15px] rounded-lg border-stroke-gray-dark border max-h-fit">
      <ul className="flex flex-col gap-[11px]">
        {navLinks.map(({ href, iconType, label }, key) => (
          <li key={key}>
            <NavLink
              className={({ isActive }) =>
                cn(
                  'flex gap-[10px] text-gray items-center font-inter font-medium text-sm text-[16px] py-[11px] px-[15px] border-stroke-gray-dark border rounded-[10px] hover:bg-grayLighter',
                  { 'bg-grayLighter text-blue': isActive },
                )
              }
              to={href}
            >
              <Icon
                type={iconType}
                props={{ size: 23, color: 'currentColor' }}
              />
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
