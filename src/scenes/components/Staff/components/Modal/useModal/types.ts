export enum ExpirationDate {
  day = 'day',
  week = 'week',
  month = 'month',
}

export type FormState = {
  searchValue: string;
  expirationDate: ExpirationDate;
};

export enum InviteItemType {
  user = 'user',
  mail = 'mail',
}

type GenericInviteItem<T, D> = GenericData<T, D> & {
  title: string;
};

export type InviteItem =
  | GenericInviteItem<InviteItemType.user, { username: string }>
  | GenericInviteItem<InviteItemType.mail, { email: string }>;

export type UseModalParams = {
  onIsOpenChange: (isOpen: boolean) => void;
  refetch?: () => void;
};
