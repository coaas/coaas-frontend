import { Icon } from '@components/Icon';

import { ComponentPropsWithoutRef } from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { navLinksMap } from '../constants';
import { cn } from '@utils/index';
import { RouteMap } from '../types';
import {
  createDynamicPath,
  DynamicPathParams,
} from '@utils/lib/create-dynamic-path';

interface Props extends ComponentPropsWithoutRef<'ul'> {
  sidebarOpened: boolean;
}

const getCurrentLinks = ({
  path,
  namespace_slug = '',
  project_slug = '',
}: DynamicPathParams) => {
  const namespacePath = RouteMap.namespace.replace(
    ':namespace_slug',
    namespace_slug,
  );
  const projectPath = RouteMap.project
    .replace(':namespace_slug', namespace_slug)
    .replace(':project_slug', project_slug);

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
  const { namespace_slug, project_slug } = useParams<PageParams>();

  const currentLinks = getCurrentLinks({
    path: pathname,
    namespace_slug,
    project_slug,
  });

  return (
    <nav>
      <ul className={cn('flex flex-col gap-1', className)}>
        {currentLinks.map(({ href, title, iconType }) => (
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
              to={createDynamicPath({
                path: href,
                namespace_slug,
                project_slug,
              })}
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
