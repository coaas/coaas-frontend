import { Icon, IconType } from '@components/Icon';
import { cn } from '@utils/styles';
import { Avatar } from '@components/Avatar';

import { useToggle } from '@utils/lib/use-toggle';
import { actionButtons } from '../constants';
import { NavLinks } from './NavLinks';

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
        <Icon type={IconType.cube} props={{ size: 32, color: '#507EF5' }} />
        <h1
          className={cn('text-[25px] text-white transition-all', {
            'translate-x-[150%] opacity-0': !state,
          })}
        >
          CloudOps
        </h1>
      </div>
      <NavLinks sidebarOpened={state} />
      <div className="mt-auto">
        <div
          className={cn('flex flex-col gap-1 transition-all', {
            'translate-x-[150%] opacity-0': !state,
          })}
        >
          {actionButtons.map(({ iconType, title }) => (
            <button
              key={title}
              className="p-3 flex gap-4 items-center text-[15px] rounded-[10px] hover:text-white text-blue-light hover:bg-area transition-colors"
            >
              <Icon
                props={{ size: 20, color: 'currentColor' }}
                type={iconType}
              />
              <p>{title}</p>
            </button>
          ))}
          <Avatar userName={'User profile'} />
        </div>
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
