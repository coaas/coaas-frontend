import { RouteMap } from '@components/Layout/components/types';
import { Params } from 'react-router-dom';

export const createDynamicPath = (path: RouteMap, params: Params) =>
  path.replace(/:(\w+)/g, (_, g1) => params[g1] || '');
