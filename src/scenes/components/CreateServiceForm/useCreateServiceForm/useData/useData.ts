import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { api, IS_MOCK_ACTIVE } from '@api/constants';

import { getMockData } from './mocks';
import { RequestParams, ResponseData } from './types';
import { ENDPOINT } from './constants';

const getTemplates = (params: RequestParams) =>
  IS_MOCK_ACTIVE
    ? getMockData()
    : api
        .post(ENDPOINT, {
          prefixUrl: '/api',
          body: JSON.stringify(params),
        })
        .json<ResponseData>();

export const useData = () => {
  const { template_id } = useParams();

  const queryKey = [template_id, 'getTemplate'];

  const { isFetching, data } = useQuery<ResponseData>({
    queryFn: () => getTemplates({ id: template_id }),
    queryKey,
    staleTime: 0,
  });

  return {
    data,
    isFetching,
  };
};
