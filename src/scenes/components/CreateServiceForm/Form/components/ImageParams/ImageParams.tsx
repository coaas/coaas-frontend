import { FC, useRef, useState } from 'react';

import { TextField } from '../common';
import { ImageParamsProps } from './types';

export const ImageParams: FC<ImageParamsProps> = ({ url, version }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    version.onChange(e.target.value);
  };

  const handleSelect = (value: string) => {
    version.onChange(value);
    setShowDropdown(false);
    inputRef.current?.blur();
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <h3 className="font-semibold text-xl text-white">Image params</h3>
      <TextField orientation="vertical" label="Image URL" {...url} />
      <div className="relative">
        <div className="flex flex-col gap-2">
          <label className="text-white font-medium text-sm">Version</label>
          <input
            ref={inputRef}
            type="text"
            className="w-full rounded-md border border-stroke-gray-dark bg-stroke-gray px-3 py-2 text-sm text-white focus:outline-none"
            placeholder="Select or enter version"
            value={version.value}
            onChange={handleInputChange}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => setShowDropdown(false)}
            autoComplete="off"
          />
        </div>
        {showDropdown && version.all.length > 0 && (
          <ul className="absolute z-10 w-full bg-stroke-gray border border-stroke-gray-dark rounded-md mt-1 max-h-40 overflow-auto shadow-lg">
            {version.all.map(value => (
              <li
                key={value}
                className="px-3 py-2 text-sm text-white cursor-pointer hover:bg-stroke-gray-dark"
                onMouseDown={() => handleSelect(value)}
              >
                {value}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
