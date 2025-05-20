import { Status } from '../model/cluster.types.ts';
import { ServerType } from '../model/dataCenter.types.ts';

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

export const convertServerType = {
  [ServerType.PURCHASED]: 'purchased',
  [ServerType.PERSONAL]: 'personal',
  [ServerType.SHARED]: 'shared',
};
