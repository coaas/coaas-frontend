import { Status } from '@scenes/components/Deploy/model/types.ts';

export const convertStatus = {
  [Status.ACTIVE]: 'active',
  [Status.LOADED]: 'loaded',
  [Status.DIED]: 'died',
  [Status.UNKNOWN]: 'unknown',
};

export const convertStatusRegion = {
  [Status.ACTIVE]: 'ready',
  [Status.LOADED]: 'loaded',
  [Status.DIED]: 'died',
  [Status.UNKNOWN]: 'unknown',
};
