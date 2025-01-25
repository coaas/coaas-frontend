import { CommonTabsProps } from '@components/Tabs/types';
import { cn } from '@utils/styles';

type Tab = { label: string; value: number; id: string };

export const InfoTabs = ({
  currentTab,
  onTabChange,
  tabs,
  className,
}: CommonTabsProps<Tab>) => {
  return (
    <div
      className={cn(
        'flex  p-[5px] gap-5 border-stroke-gray border rounded-[6px]',
        className,
      )}
    >
      {tabs.map(tab => {
        const selected = tab.id === currentTab.id;

        const handleClickTab = () => !selected && onTabChange(tab);

        return (
          <button
            key={tab.id}
            onClick={handleClickTab}
            type="button"
            className={cn(
              'transition-colors text-white text-sm font-medium font-inter text-center py-[5px] rounded-[3px] flex-1',
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
