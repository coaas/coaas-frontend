import type { Instance, Server } from '../model/cluster.types.ts';
import { FixedRule } from '../model/deployed.types.ts';

type UnionType = Server | Instance | FixedRule;
export const isServer = (obj: UnionType) => 'availability_zone' in obj;
export const isInstance = (obj: UnionType) => 'memory' in obj;
export const isFixedRule = (obj: UnionType) => 'replicas' in obj;
