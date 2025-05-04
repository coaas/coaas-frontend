import { FC } from 'react';

import { InviteItemType } from '../../../useModal';
import { InviteItemProps } from './types';

export const InviteItem: FC<InviteItemProps> = ({ item }) => (
  <>
    <p className="text-sm">{item.title}</p>
    <p className="text-xs mt-[2px]">
      {item.type === InviteItemType.user
        ? `Invite user ${item.title}`
        : `Send invitation to ${item.title}`}
    </p>
  </>
);
