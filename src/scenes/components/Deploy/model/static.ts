import { Status } from '@scenes/components/Deploy/model/types.ts';

export const convertStatus = {
  [Status.ACTIVE]: 'active',
  [Status.LOADED]: 'loaded',
  [Status.DIED]: 'died',
  [Status.UNKNOWN]: 'unknown',
};
