import { Field } from './types';

export const FIELDS: Field[] = [
  {
    label: 'Name',
    id: 'name',
  },
  {
    label: 'Description',
    id: 'description',
  },
  {
    label: 'Slug',
    id: 'slug',
  },
];

export const SLUG_CHECK_DEBOUNCE = 200;
