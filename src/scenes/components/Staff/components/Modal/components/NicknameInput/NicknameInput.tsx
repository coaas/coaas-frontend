import { FC } from 'react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/PopoverRadix';
import { Input } from '@components/Input';

import { INPUT_IDS } from '../../constants';
import { NicknameInputProps } from './types';
import { InviteItem } from './InviteItem';

export const NicknameInput: FC<NicknameInputProps> = ({
  isUserFetchingPending,
  searchValue,
  inviteItems,
  onInviteItemClick,
  onSearchChange,
}) => (
  <Popover open={!!searchValue} modal>
    <PopoverContent>
      <div>
        {isUserFetchingPending ? (
          <div className="py-1.5 px-2 text-sm">Loading...</div>
        ) : (
          <>
            {inviteItems.length ? (
              inviteItems.map(item => (
                <div
                  className="w-full cursor-pointer select-none items-center rounded-sm py-1.5 px-2 outline-none hover:bg-stroke-gray-dark"
                  key={item.title}
                  onClick={() => onInviteItemClick(item)}
                >
                  <InviteItem item={item} />
                </div>
              ))
            ) : (
              <div className="py-1.5 px-2 text-sm">{`Nothing was found for ${searchValue}`}</div>
            )}
          </>
        )}
      </div>
    </PopoverContent>
    <PopoverTrigger className="w-full block">
      <Input
        id={INPUT_IDS.searchValue}
        invalid={!searchValue}
        value={searchValue}
        onChange={({ target: { value } }) => onSearchChange(value)}
      />
    </PopoverTrigger>
  </Popover>
);
