import { InfiniteData } from '@tanstack/react-query';

import { ResponseData } from '../../useData';

export const getParsedData = (responseData?: InfiniteData<ResponseData>) => {
  const namespaces =
    responseData?.pages.flatMap(({ namespaces }) => namespaces) || [];

  return { namespaces };
};
