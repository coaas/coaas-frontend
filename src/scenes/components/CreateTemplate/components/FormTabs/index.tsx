import { CommonTabsProps } from '@components/Tabs/types';
import { cn } from '@utils/styles';

type Tab = { label: string; value: number; id: string };

export const FormTabs = ({
  currentTab,
  onTabChange,
  tabs,
  className,
  disabled,
}: CommonTabsProps<Tab> & { disabled?: (tabId: string) => boolean }) => {
  return (
    <div
      className={cn('flex border-stroke-gray border rounded-[6px]', className)}
    >
      {tabs.map(tab => {
        const selected = tab.id === currentTab.id;

        const handleClickTab = () => !selected && onTabChange(tab);

        return (
          <button
            disabled={disabled?.(tab.id)}
            key={tab.id}
            onClick={handleClickTab}
            type="button"
            className={cn(
              'transition-colors text-white text-sm font-medium font-inter text-center py-[5px] m-[5px] rounded-[3px] flex-1',
              { 'bg-stroke-gray': selected },
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};
