import { FC } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/Select';

import { TextField } from '../common';
import { ImageParamsProps } from './types';

export const ImageParams: FC<ImageParamsProps> = ({ url, version }) => {
  return (
    <div className="flex flex-col gap-5 w-full">
      <h3 className="font-semibold text-xl text-white">Image params</h3>
      <TextField orientation="vertical" label="Image URL" {...url} />
      <div>
        <label className="text-white font-medium text-sm mb-1">Version</label>
        <Select onValueChange={version.onChange} defaultValue={version.value}>
          <SelectTrigger>
            <SelectValue placeholder="Select the expiration date" />
          </SelectTrigger>
          <SelectContent>
            {version.all.map(value => (
              <SelectItem key={value} value={value}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
