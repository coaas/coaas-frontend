import { Icon } from '@components/Icon';

import { ComponentPropsWithoutRef } from 'react';
import { NavLink, Params, useLocation, useParams } from 'react-router-dom';
import { navLinksMap } from '../constants';
import { cn } from '@utils/index';
import { RouteMap } from '../types';
import { createDynamicPath } from '@utils/lib/create-dynamic-path';

interface Props extends ComponentPropsWithoutRef<'ul'> {
  sidebarOpened: boolean;
}

const getCurrentLinks = (path: string, params: Params) => {
  const namespacePath = createDynamicPath(RouteMap.namespace, params);
  const projectPath = createDynamicPath(RouteMap.project, params);
  const createProjectPath = createDynamicPath(RouteMap.createProject, params);
  const projectsPath = createDynamicPath(RouteMap.projects, params);

  // Проверяем специальные случаи сначала
  if (path === createProjectPath || path === projectsPath) {
    return navLinksMap.get(RouteMap.namespace) || [];
  }

  return (
    navLinksMap.get(
      (path.startsWith(projectPath) && RouteMap.project) ||
        (path.startsWith(namespacePath) && RouteMap.namespace) ||
        RouteMap.home,
    ) || []
  );
};

export const NavLinks = ({ sidebarOpened, className }: Props) => {
  const { pathname } = useLocation();
  const params = useParams();

  const currentLinks = getCurrentLinks(pathname, params);

  return (
    <nav>
      <ul className={cn('flex flex-col gap-1', className)}>
        {currentLinks.map(({ href, title, iconType }) => (
          <li key={href}>
            <NavLink
              className={({ isActive }) =>
                cn(
                  'p-3 rounded-[10px] flex gap-4 items-center max-h-[46.5px] text-blue-light dark:text-blue-light text-blue transition-colors',
                  {
                    'text-white dark:text-white text-gray-900 bg-area dark:bg-area bg-gray-100': isActive,
                    'hover:bg-area-dark dark:hover:bg-area-dark hover:bg-gray-50': !isActive,
                  },
                )
              }
              to={createDynamicPath(href, params)}
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
    </nav>
  );
};
