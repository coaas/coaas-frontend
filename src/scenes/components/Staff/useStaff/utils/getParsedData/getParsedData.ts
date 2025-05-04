import { InfiniteData } from '@tanstack/react-query';

import { ResponseData } from '../../useData';

export const getParsedData = (responseData?: InfiniteData<ResponseData>) => {
  const members = responseData?.pages.flatMap(({ members }) => members) || [];

  return { members };
};
