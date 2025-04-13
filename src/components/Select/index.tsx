import { Icon, IconType } from '@components/Icon';
import { Popover } from '@components/Popover';
import { useToggle } from '@utils/lib/use-toggle';
import { cn } from '@utils/styles';
import debounce from 'debounce';
import { Check } from 'lucide-react';
import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  ReactElement,
  useState,
} from 'react';
import { SelectVariant, SelectVariants } from './styles';

interface Props<TOption>
  extends Omit<ComponentPropsWithoutRef<'div'>, 'defaultValue' | 'children'> {
  defaultLabel?: string;
  options: Option<TOption>[];
  onOptionChange: (option: Option<TOption>, close?: () => void) => void;
  defaultValue?: TOption[];
  multiple?: boolean;
  defaultOpen?: boolean;
  withSearch?: boolean;
  onSearchChange?: (value: string) => void;
  delay?: number;
  variant?: SelectVariant;
  children?: (
    options: Option<TOption>[],
    onChange: React.Dispatch<React.SetStateAction<TOption[]>>,
  ) => ReactElement;
  withChevron?: boolean;
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
  defaultValue = [],
  variant = 'filterView',
  children,
  withChevron,
}: Props<T>) {
  const { state, setState, off } = useToggle(defaultOpen);
  const [items, setItems] = useState(defaultValue);
  const [search, setSearch] = useState('');

  const debouncedSearchHandler = debounce(onSearchChange, delay);

  const optionsToPass = options.filter(({ value }) => items.includes(value));

  const labelStr =
    optionsToPass.map(({ label }) => label).join(', ') || defaultLabel;

  const handleClickOption = (option: Option<T>) => {
    setItems(items => {
      const optionSelected = items.includes(option.value);
      if (multiple) {
        return optionSelected
          ? items.filter(item => item !== option.value)
          : [...items, option.value];
      }
      return optionSelected ? [] : [option.value];
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
    <>
      <Popover
        close={off}
        open={state}
        setOpen={setState}
        offsetNum={1}
        render={() => (
          <div
            className={cn(
              SelectVariants({ variant }),
              'flex flex-col rounded-md  border max-h-[400px] overflow-auto bg-stroke-gray',
            )}
          >
            {withSearch && (
              <input
                onChange={handleSearch}
                value={search}
                key={state.toString()}
                className={cn(
                  SelectVariants({ variant }),
                  'flex justify-between gap-2 items-center first:rounded-t-md last:rounded-b-md transition-colors  py-2 px-[14px] [&:not(:last-child)]:border-b outline-none focus-visible:bg-stroke-gray text-white',
                )}
              />
            )}
            {filteredOptions.map(option => {
              const { label, value } = option;

              const selected = items.length > 0 && items.includes(value);

              return (
                <button
                  key={option.value}
                  onClick={() => handleClickOption(option)}
                  className={cn(
                    SelectVariants({ variant }),
                    'flex justify-between gap-2 items-center first:rounded-t-md last:rounded-b-md transition-colors py-2 px-[14px] [&:not(:last-child)]:border-b ',
                  )}
                  data-selected={selected}
                  type="button"
                >
                  <span className="text-sm leading-6 font-inter font-normal whitespace-nowrap text-[current-color] text-ellipsis overflow-hidden">
                    {label}
                  </span>
                  {selected && (
                    <Check className="text-[currentColor] size-[16px] shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      >
        <button
          className={cn(
            SelectVariants({ variant }),
            'px-[14px] w-full py-1 flex items-center justify-between gap-[14px] rounded-md border',
            className,
          )}
          type="button"
        >
          <label className="text-sm leading-6 font-inter w-fit font-normal whitespace-nowrap text-white text-ellipsis overflow-hidden cursor-pointer m-auto">
            {labelStr}
          </label>
          {withChevron && (
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
          )}
        </button>
      </Popover>
      {children?.(optionsToPass, setItems)}
    </>
  );
}
