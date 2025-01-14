import { NavLink } from 'react-router-dom';
import { NavLinks } from './constants';
import { Icon, IconType } from '@components/Icon';
import { cn } from '@utils/styles';
import { Avatar } from '@components/Avatar';

import { useToggle } from '@utils/hooks/useToggle';

export const Sidebar = () => {
  const { state, toggle } = useToggle(true);

  return (
    <aside
      className={cn(
        'flex flex-col border-r-[1.5px] p-[8px_8px_2px] border-r-stroke-gray w-full overflow-x-hidden transition-[max-width] max-w-[280px]',
        { 'max-w-[62px]': !state },
      )}
    >
      <div className="flex gap-[10px] items-center p-[6px]">
        <span className="bg-stroke-gray size-8 rounded-[7px]" />
        {state && <h1 className="text-[25px] text-white">Cloud Ops</h1>}
      </div>
      <ul className="flex flex-col gap-1">
        {NavLinks.map(({ href, title, iconType }) => (
          <li key={href}>
            <NavLink to={href}>
              {({ isActive }) => {
                const activeStyle = 'text-white bg-area ';

                return (
                  <span
                    className={cn(
                      'p-3 rounded-[10px] flex gap-4 items-center text-blue-light transition-colors ',
                      {
                        [activeStyle]: isActive,
                        'hover:bg-area-dark': !isActive,
                      },
                    )}
                  >
                    <Icon
                      props={{
                        color: 'currentColor',
                        size: 20,
                      }}
                      type={iconType}
                    />
                    {state && <p className="text-[15px]">{title}</p>}
                  </span>
                );
              }}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="mt-auto">
        {state && (
          <div className="flex flex-col gap-1">
            <>
              <button className="p-3 flex gap-4 items-center text-[15px] rounded-[10px] hover:text-white text-blue-light hover:bg-area transition-colors">
                <Icon
                  props={{ size: 20, color: 'currentColor' }}
                  type={IconType.cube}
                />
                <p>Notifications</p>
              </button>
              <button className="p-3 flex gap-4 items-center text-[15px] rounded-[10px] hover:text-white text-blue-light hover:bg-area transition-colors">
                <Icon
                  props={{ size: 20, color: 'currentColor' }}
                  type={IconType.support}
                />
                <p>Support center</p>
              </button>
              <button className="p-3 flex gap-4 items-center text-[15px] rounded-[10px] hover:text-white text-blue-light hover:bg-area transition-colors">
                <Icon
                  props={{ size: 20, color: 'currentColor' }}
                  type={IconType.settings}
                />
                <p>Settings</p>
              </button>
            </>
            <Avatar userName={state ? 'User profile' : ''} />
          </div>
        )}
        <div className="border-t-[1.5px] border-stroke-gray flex items-center justify-center p-2 ">
          <button className="text-blue-light" onClick={toggle}>
            <Icon
              props={{
                size: 20,
                color: 'currentColor',
                className: cn({ 'rotate-180': !state }),
              }}
              type={IconType.doubleArrow}
            />
          </button>
        </div>
      </div>
    </aside>
  );
};
