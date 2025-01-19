import { InfiniteData } from '@tanstack/react-query';

import { ResponseData } from '../../useData';

export const getParsedData = (responseData?: InfiniteData<ResponseData>) => ({
  projects: responseData?.pages.flatMap(({ projects }) => projects) || [],
});
