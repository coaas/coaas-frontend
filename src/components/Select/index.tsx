import { Icon, IconType } from '@components/Icon';
import { Popover } from '@components/Popover';
import { useToggle } from '@utils/lib/use-toggle';
import { cn } from '@utils/styles';
import debounce from 'debounce';
import { Check } from 'lucide-react';
import { ChangeEvent, ComponentPropsWithoutRef, useState } from 'react';

interface Props<TOption>
  extends Omit<ComponentPropsWithoutRef<'div'>, 'defaultValue'> {
  defaultLabel?: string;
  options: Option<TOption>[];
  onOptionChange: (option: Option<TOption>, close?: () => void) => void;
  defaultValue?: Option<TOption> | Option<TOption>[] | null;
  multiple?: boolean;
  defaultOpen?: boolean;
  withSearch?: boolean;
  onSearchChange?: (value: string) => void;
  delay?: number;
}

export function Select<T extends string | number>({
  options,
  defaultLabel,
  onOptionChange,
  onSearchChange = () => {},
  delay = 500,
  className,
  multiple,
  defaultOpen,
  withSearch,
  defaultValue = multiple ? [] : null,
}: Props<T>) {
  const { state, setState, off } = useToggle(defaultOpen);

  const [search, setSearch] = useState('');

  const debouncedSearchHandler = debounce(onSearchChange, delay);

  const [items, setItems] = useState<Option<T> | Option<T>[] | null>(
    defaultValue,
  );

  const labelStr =
    (Array.isArray(items)
      ? items.map(({ label }) => label).join(', ')
      : items?.label) || defaultLabel;

  const handleClickOption = (option: Option<T>) => {
    setItems(items => {
      if (Array.isArray(items)) {
        return items.find(item => item.value === option.value)
          ? items.filter(i => i.value !== option.value)
          : [...items, option];
      }
      return option.value === items?.value ? null : option;
    });

    onOptionChange(option);
  };

  const handleSearch = ({
    currentTarget: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setSearch(value);
    debouncedSearchHandler(value);
  };

  const filteredOptions = options.filter(({ label }) =>
    label.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Popover
      close={off}
      open={state}
      setOpen={setState}
      offsetNum={1}
      render={() => (
        <div className="flex flex-col rounded-md border-stroke border max-h-[400px] overflow-auto">
          {withSearch && (
            <input
              onChange={handleSearch}
              value={search}
              key={state.toString()}
              className="flex justify-between gap-2 items-center first:rounded-t-md last:rounded-b-md transition-colors bg-stroke-gray-light py-2 px-[14px] [&:not(:last-child)]:border-b border-stroke outline-none focus-visible:bg-stroke-gray"
            />
          )}
          {filteredOptions.map(option => {
            const { label } = option;

            const selected = Boolean(
              Array.isArray(items)
                ? items.find(item => item.value === option.value)
                : items?.value === option.value,
            );

            return (
              <button
                key={option.value}
                onClick={() => handleClickOption(option)}
                className={cn(
                  'flex justify-between gap-2 items-center first:rounded-t-md last:rounded-b-md transition-colors bg-stroke-gray-light py-2 px-[14px] [&:not(:last-child)]:border-b border-stroke',
                  {
                    'bg-stroke-blue border-blue': selected,
                  },
                )}
                type="button"
              >
                <span className="text-sm leading-6 font-inter font-normal whitespace-nowrap text-white text-ellipsis overflow-hidden">
                  {label}
                </span>
                {selected && (
                  <Check className="text-white size-[16px] shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      )}
    >
      <button
        className={cn(
          'text-stroke bg-stroke-gray-light px-[14px] w-full py-1 flex items-center justify-between gap-[14px] rounded-md border-stroke border',
          className,
        )}
        type="button"
      >
        <label className="text-sm leading-6 font-inter w-fit font-normal whitespace-nowrap text-white text-ellipsis overflow-hidden cursor-pointer">
          {labelStr}
        </label>
        <Icon
          type={IconType.chevron}
          props={{
            size: 16,
            color: 'currentColor',
            className: cn('transition-transform shrink-0', {
              'rotate-180': state,
            }),
          }}
        />
      </button>
    </Popover>
  );
}
