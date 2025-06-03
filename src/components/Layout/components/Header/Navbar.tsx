import { Icon, IconType } from '@components/Icon';
import { Popover } from '@components/Popover';
import { createDynamicPath } from '@utils/lib/create-dynamic-path';
import { objectKeys } from '@utils/lib/object-keys';
import { useToggle } from '@utils/lib/use-toggle';
import { Link, useParams } from 'react-router-dom';
import { RouteMap } from '../types';
import { cn } from '@utils/styles';
import { useApiQuery } from '@utils/lib/use-api-query';
import { getUserNamespacesAndProjects } from '@api/queries';
import { useUser } from '@utils/lib/use-user';

// Функция для получения инициалов namespace (первые 2 заглавные буквы)
const getNamespaceInitials = (namespace: string) => {
  return namespace.substring(0, 2).toUpperCase();
};

// Функция для генерации рандомного цвета для проекта
const getProjectColor = (projectSlug: string) => {
  const colors = [
    '#507EF5', // blue
    '#1EA574', // green
    '#FFBB4F', // orange
    '#FF4F52', // red
    '#D24FD0', // violet
    '#7086A6', // blue-light
    '#708DA6', // blue-soft
  ];
  
  // Используем простой хэш строки для детерминированного выбора цвета
  let hash = 0;
  for (let i = 0; i < projectSlug.length; i++) {
    hash = projectSlug.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

export const Navbar = () => {
  const { state, off, setState } = useToggle();

  const params = useParams();

  const currentNamespaceSlug = params.namespace_slug;
  const currentProjectSlug = params.project_slug;

  const { data } = useApiQuery({
    request: getUserNamespacesAndProjects,
    requestOptions: {
      prefixUrl: '/api',
    },
  });

  const user = useUser();

  if (!data) return null;

  const namespacesSlugs = objectKeys(data.namespaces);

  const currentNamespace = data.namespaces[currentNamespaceSlug || ''];

  const currentNamespaceProjectsSlugs = objectKeys(
    currentNamespace?.projects || {},
  );

  const currentProject = currentNamespace?.projects?.[currentProjectSlug || ''];

  return (
    <Popover
      open={state}
      close={off}
      setOpen={setState}
      offsetNum={24}
      passWidth={false}
      render={({ close }) => (
        <div
          onClick={close}
          className="py-[14px] z-10 px-[22px] border-stroke-gray-dark dark:border-stroke-gray-dark border-gray-300 border-[1.5px] rounded-lg flex gap-[22px] w-full max-w-fit bg-background dark:bg-background bg-white max-h-[400px] overflow-auto shadow-xl"
        >
          {namespacesSlugs.length > 0 && (
            <div className="flex-1 min-w-[247px]">
              <h3 className="text-blue-light dark:text-blue-light text-blue text-xl font-inter leading-5 font-semibold">
                Namespaces
              </h3>
              <ul className="flex flex-col gap-[2px] mt-[14px]">
                {namespacesSlugs.map(namespaceSlug => {
                  console.log(
                    createDynamicPath(RouteMap.namespace, {
                      namespace_slug: namespaceSlug.toString(),
                    }),
                  );
                  const namespace = data.namespaces[namespaceSlug];
                  if (!namespace) return null;
                  return (
                    <li key={namespaceSlug}>
                      <Link
                        className={cn(
                          'p-3 rounded-[10px] block transition-colors text-[15px] leading-5 text-white dark:text-white text-gray-900 flex items-center gap-3',
                          {
                            'bg-area dark:bg-area bg-gray-100':
                              currentNamespaceSlug === namespaceSlug,
                            'hover:bg-area dark:hover:bg-area hover:bg-gray-50':
                              currentNamespaceSlug !== namespaceSlug,
                          },
                        )}
                        to={createDynamicPath(RouteMap.namespace, {
                          namespace_slug: namespaceSlug.toString(),
                        })}
                      >
                        <div className="w-8 h-6 bg-blue/20 border border-blue rounded-sm flex items-center justify-center text-xs font-bold text-blue">
                          {getNamespaceInitials(namespaceSlug.toString())}
                        </div>
                        <span>{namespaceSlug}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          {currentNamespace && currentNamespaceProjectsSlugs.length > 0 && (
            <span className="w-[1px] bg-stroke-gray-dark dark:bg-stroke-gray-dark bg-gray-300" />
          )}
          {currentNamespace && currentNamespaceProjectsSlugs.length > 0 && (
            <div className="flex-1 min-w-[247px]">
              <h3 className="text-blue-light dark:text-blue-light text-blue text-xl font-inter leading-5 font-semibold">
                Projects
              </h3>
              <ul className="flex flex-col gap-[2px] mt-[14px]">
                {currentNamespaceProjectsSlugs.map(projectSlug => {
                  const project = currentNamespace?.projects[projectSlug];
                  if (!project) return null;
                  const projectColor = getProjectColor(projectSlug.toString());
                  return (
                    <li key={projectSlug}>
                      <Link
                        className={cn(
                          'p-3 rounded-[10px] block transition-colors text-[15px] leading-5 text-white dark:text-white text-gray-900 flex items-center gap-3',
                          {
                            'bg-area dark:bg-area bg-gray-100':
                              currentProjectSlug === projectSlug,
                            'hover:bg-area dark:hover:bg-area hover:bg-gray-50':
                              currentNamespaceSlug !== projectSlug,
                          },
                        )}
                        to={createDynamicPath(RouteMap.project, {
                          ...params,
                          project_slug: projectSlug.toString(),
                        })}
                      >
                        <div 
                          className="w-4 h-4 rounded-sm" 
                          style={{ backgroundColor: projectColor }}
                        />
                        <span>{projectSlug}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      )}
    >
      <nav className="flex items-center gap-2 px-2 py-[6px] rounded-lg select-none max-w-fit cursor-pointer hover:bg-area-dark dark:hover:bg-area-dark hover:bg-gray-100 transition-colors">
        <div className="flex items-center gap-1">
          <Icon type={IconType.cube} props={{ size: 20 }} />
          <span className="text-[15px] leading-5 font-medium text-blue-light dark:text-blue-light text-blue">
            {user?.username}
          </span>
        </div>
        {currentNamespace && (
          <div className="flex items-center gap-1">
            <div className="w-6 h-4 bg-blue/20 border border-blue rounded-sm flex items-center justify-center text-xs font-bold text-blue mr-1">
              {getNamespaceInitials(currentNamespaceSlug || '')}
            </div>
            <span className="text-[15px] leading-5 font-medium text-blue-light dark:text-blue-light text-blue">
              {currentNamespaceSlug}
            </span>
            {objectKeys(currentNamespace.projects).length > 0 && (
              <Icon type={IconType.chevron} props={{ size: 10 }} />
            )}
          </div>
        )}
        {currentProject && (
          <div className="flex items-center gap-1">
            <div 
              className="w-3 h-3 rounded-sm mr-1" 
              style={{ backgroundColor: getProjectColor(currentProjectSlug || '') }}
            />
            <span className="text-[15px] leading-5 font-medium text-blue-light dark:text-blue-light text-blue">
              {currentProjectSlug}
            </span>
          </div>
        )}
      </nav>
    </Popover>
  );
};
