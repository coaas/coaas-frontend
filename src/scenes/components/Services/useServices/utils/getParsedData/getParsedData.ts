import { InfiniteData } from '@tanstack/react-query';

import { ResponseData } from '../../useData';

export const getParsedData = (responseData?: InfiniteData<ResponseData>) => {
  const services =
    responseData?.pages.flatMap(({ services }) => services) || [];

  return { services };
};
