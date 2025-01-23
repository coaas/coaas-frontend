import { FC } from 'react';

import { Icon, IconType } from '@components/Icon';
import { cn } from '@utils/styles';

import { SearchSectionProps } from './types';
import { useSearch } from './useSearch';

export const Search: FC<SearchSectionProps> = ({ className, ...props }) => {
  const {
    value,
    isSearchFocused,
    onInputChange,
    onSearchBlur,
    onSearchClick,
    onSearchFocus,
    inputRef,
  } = useSearch(props);

  return (
    <div
      className={cn(
        'w-full flex items-center py-1 px-3 cursor-pointer box-border border-stroke-gray-dark border-[2px] rounded-md bg-inherit',
        {
          'border-stroke-gray': isSearchFocused,
        },
        className,
      )}
      onFocus={onSearchFocus}
      onBlur={onSearchBlur}
      onClick={onSearchClick}
      tabIndex={0}
    >
      <Icon type={IconType.search} props={{ size: 20 }} />
      <input
        ref={inputRef}
        value={value}
        tabIndex={-1}
        onChange={onInputChange}
        aria-label="search"
        placeholder={props.config?.placeholder}
        className="w-full font-normal text-sm leading-[24px] ml-2 text-white outline-none border-none cursor-text px-2 bg-[inherit] "
      />
    </div>
  );
};
