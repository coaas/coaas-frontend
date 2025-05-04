import { ExpirationDate } from './useModal';

export const INPUT_IDS = {
  searchValue: 'input_for_invite_nickname',
  expirationDate: 'input_for_invite_expiration_date',
};

export const SELECT_ITEMS = [
  {
    title: 'One day',
    value: ExpirationDate.day,
  },
  {
    title: 'A week',
    value: ExpirationDate.week,
  },
  {
    title: 'A month',
    value: ExpirationDate.month,
  },
];
