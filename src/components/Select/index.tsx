import { Icon, IconType } from '@components/Icon';
import { Popover } from '@components/Popover';
import { useToggle } from '@utils/lib/use-toggle';
import { cn } from '@utils/styles';
import { Check } from 'lucide-react';
import { ComponentPropsWithoutRef, useState } from 'react';

interface Props<TOption>
  extends Omit<ComponentPropsWithoutRef<'div'>, 'defaultValue'> {
  defaultOption?: Option<TOption>;
  options: Option<TOption>[];
  onOptionChange: (option: Option<TOption>, close?: () => void) => void;
  defaultValue?: Option<TOption> | Option<TOption>[] | null;
  multiple?: boolean;
}

export function Select<T extends string | number>({
  options,
  defaultOption,
  onOptionChange,
  className,
  multiple,
  defaultValue = multiple ? [] : null,
}: Props<T>) {
  const { state, setState, off } = useToggle();

  const [items, setItems] = useState<Option<T> | Option<T>[] | null>(
    defaultValue,
  );

  const labelStr =
    (Array.isArray(items)
      ? items.map(({ label }) => label).join(', ')
      : items?.label) || defaultOption?.label;

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

  return (
    <Popover
      close={off}
      open={state}
      setOpen={setState}
      offsetNum={1}
      render={() => (
        <div
          className={cn(
            'flex flex-col  rounded-md border-stroke border',
            className,
          )}
        >
          {options.map(option => {
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
                {selected && <Check className="text-white size-[16px]" />}
              </button>
            );
          })}
        </div>
      )}
    >
      <button
        className={cn(
          'text-stroke bg-stroke-gray-light px-[14px] w-full py-2 flex items-center justify-between gap-[14px] rounded-md border-stroke border',
          className,
        )}
        type="button"
      >
        <label className="text-sm leading-6 font-inter w-fit font-normal whitespace-nowrap text-white text-ellipsis overflow-hidden">
          {labelStr}
        </label>
        <Icon
          type={IconType.chevron}
          props={{
            size: 16,
            color: 'currentColor',
            className: cn('transition-transform', {
              'rotate-180': state,
            }),
          }}
        />
      </button>
    </Popover>
  );
}
