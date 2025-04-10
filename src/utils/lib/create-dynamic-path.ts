import { Params } from 'react-router-dom';

export const createDynamicPath = (path: string, params: Params) =>
  path.replace(/:(\w+)/g, (_, g1) => params[g1] || '');
