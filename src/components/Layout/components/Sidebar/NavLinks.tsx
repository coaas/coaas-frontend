import { Icon } from '@components/Icon';

import { ComponentPropsWithoutRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { navLinksMap } from '../constants';
import { cn } from '@utils/index';
import { RouteMap } from '../types';

interface NavLinksProps extends ComponentPropsWithoutRef<'ul'> {
  sidebarOpened: boolean;
}

const getCurrentLinks = (path: string) =>
  navLinksMap.get(
    (path.startsWith(RouteMap.namespaces) && RouteMap.namespaces) ||
      (path.startsWith(RouteMap.projects) && RouteMap.projects) ||
      RouteMap.home,
  ) || [];
export const NavLinks = ({ sidebarOpened, className }: NavLinksProps) => {
  const { pathname } = useLocation();

  return (
    <ul className={cn('flex flex-col gap-1', className)}>
      {getCurrentLinks(pathname).map(({ href, title, iconType }) => (
        <li key={href}>
          <NavLink
            className={({ isActive }) =>
              cn(
                'p-3 rounded-[10px] flex gap-4 items-center max-h-[46.5px] text-blue-light transition-colors ',
                {
                  'text-white bg-area ': isActive,
                  'hover:bg-area-dark': !isActive,
                },
              )
            }
            to={href}
          >
            <Icon
              props={{
                color: 'currentColor',
                size: 20,
                className: 'shrink-0',
              }}
              type={iconType}
            />
            <span
              className={cn('text-[15px] transition-all', {
                'translate-x-[150%] opacity-0': !sidebarOpened,
              })}
            >
              {title}
            </span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
