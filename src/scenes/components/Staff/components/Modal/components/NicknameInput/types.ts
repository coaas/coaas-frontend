import { InviteItem } from '../../useModal';

export type NicknameInputProps = {
  isUserFetchingPending: boolean;
  inviteItems: InviteItem[];
  searchValue: string;
  onInviteItemClick: (item: InviteItem) => void;
  onSearchChange: (search: string) => void;
};
