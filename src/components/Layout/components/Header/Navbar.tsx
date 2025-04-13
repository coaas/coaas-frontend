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

export const Navbar = () => {
  const { state, off, setState } = useToggle();

  const params = useParams();

  const currentNamespaceSlug = params.namespace_slug;
  const currentProjectSlug = params.project_slug;

  const { data } = useApiQuery({
    request: getUserNamespacesAndProjects,
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
      render={({ close }) => (
        <div
          onClick={close}
          className="py-[14px] px-[22px] border-stroke-gray-dark border-[1.5px] rounded-lg flex gap-[22px] w-full max-w-fit bg-background max-h-[400px] overflow-auto"
        >
          {namespacesSlugs.length > 0 && (
            <div className="flex-1 min-w-[247px]">
              <h3 className="text-gray text-xl font-inter leading-5 font-semibold">
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
                          'p-3 rounded-[10px] block transition-colors text-[15px] leading-5',
                          {
                            'bg-area': currentNamespaceSlug === namespaceSlug,
                            'hover:bg-area':
                              currentNamespaceSlug !== namespaceSlug,
                          },
                        )}
                        to={createDynamicPath(RouteMap.namespace, {
                          namespace_slug: namespaceSlug.toString(),
                        })}
                      >
                        {namespaceSlug}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          {currentNamespace && currentNamespaceProjectsSlugs.length > 0 && (
            <span className="w-[1px] bg-stroke-gray-dark" />
          )}
          {currentNamespace && currentNamespaceProjectsSlugs.length > 0 && (
            <div className="flex-1 min-w-[247px]">
              <h3 className="text-gray text-xl font-inter leading-5 font-semibold">
                Projects
              </h3>
              <ul className="flex flex-col gap-[2px] mt-[14px]">
                {currentNamespaceProjectsSlugs.map(projectSlug => {
                  const project = currentNamespace?.projects[projectSlug];
                  if (!project) return null;
                  return (
                    <li key={projectSlug}>
                      <Link
                        className={cn(
                          'p-3 rounded-[10px] block transition-colors text-[15px] leading-5',
                          {
                            'bg-area': currentProjectSlug === projectSlug,
                            'hover:bg-area':
                              currentNamespaceSlug !== projectSlug,
                          },
                        )}
                        to={createDynamicPath(RouteMap.project, {
                          ...params,
                          project_slug: projectSlug.toString(),
                        })}
                      >
                        {projectSlug}
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
      <nav className="flex items-center gap-2 px-2 py-[6px] rounded-lg select-none max-w-fit cursor-pointer hover:bg-area-dark">
        <div className="flex items-center gap-1">
          <Icon type={IconType.cube} props={{ size: 20 }} />
          <span className="text-[15px] leading-5 font-medium text-gray">
            {user?.username}
          </span>
        </div>
        {currentNamespace && (
          <div className="flex items-center gap-1">
            <Icon type={IconType.support} props={{ size: 20 }} />
            <span className="text-[15px] leading-5 font-medium text-gray">
              {currentNamespaceSlug}
            </span>
            {objectKeys(currentNamespace.projects).length > 0 && (
              <Icon type={IconType.chevron} props={{ size: 10 }} />
            )}
          </div>
        )}
        {currentProject && (
          <div className="flex items-center gap-1">
            <span className="text-[15px] leading-5 font-medium text-gray">
              {currentProjectSlug}
            </span>
          </div>
        )}
      </nav>
    </Popover>
  );
};
