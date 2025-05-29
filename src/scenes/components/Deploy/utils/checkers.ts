import type { Instance, Server } from '../model/cluster.types.ts';
import { FixedRule } from '../model/deployed.types.ts';

type UnionType = Server | Instance | FixedRule;
export const isServer = (obj: UnionType) => 'availability_zone' in obj;
export const isInstance = (obj: UnionType) => 'memory' in obj;
export const isFixedRule = (obj: UnionType) => 'replicas' in obj;

export const getEmptiesBy = <T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
): K[] | null => {
  const foundKeys = Object.entries(obj).reduce((acc, [key, value]) => {
    if ([null, undefined, ''].includes(value) && keys.includes(key as K)) {
      acc.push(key as K);
    }
    return acc;
  }, [] as K[]);

  return foundKeys.length > 0 ? foundKeys : null;
};
