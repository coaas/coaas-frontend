import { routes } from '@scenes/Scenes';
import { matchRoutes, useLocation } from 'react-router-dom';

export const useRoutes = () => {
  const location = useLocation();

  const routesArr = matchRoutes(routes, location);

  const currentRoute = routesArr?.[routesArr.length - 1];

  return { routesArr, currentRoute };
};
