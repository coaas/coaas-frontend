import debounce from 'debounce';
import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';

import { UseSearchParams } from './types';

export const useSearch = ({
  initValue: nullableInitValue,
  onChange,
  config,
}: UseSearchParams) => {
  const initValue = nullableInitValue || '';

  const { delay = 0 } = config || {};

  const [value, setValue] = useState(initValue);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedOnChange = useMemo(
    () => debounce(onChange, delay),
    [onChange, delay],
  );

  const onInputChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setValue(value);
    debouncedOnChange(value);
  };

  const onSearchFocus = () => setIsSearchFocused(true);
  const onSearchBlur = () => setIsSearchFocused(false);

  useEffect(() => {
    const { current } = inputRef;

    if (isSearchFocused) {
      current?.focus();
    } else {
      current?.blur();
    }
  }, [isSearchFocused, inputRef]);

  useEffect(() => setValue(initValue), [initValue]);

  return {
    value,
    isSearchFocused,
    inputRef,
    onInputChange,
    onSearchBlur,
    onSearchFocus,
    onSearchClick: onSearchFocus,
  };
};
