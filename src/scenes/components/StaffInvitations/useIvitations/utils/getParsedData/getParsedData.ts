import { InfiniteData } from '@tanstack/react-query';

import { ResponseData } from '../../useData';

export const getParsedData = (responseData?: InfiniteData<ResponseData>) => {
  const invitations =
    responseData?.pages.flatMap(({ invitations }) => invitations) || [];

  return { invitations };
};
