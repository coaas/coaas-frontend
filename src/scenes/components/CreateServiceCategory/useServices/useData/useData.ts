import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { api, IS_MOCK_ACTIVE } from '@api/constants';

import { getMockData } from './mocks';
import { RequestParams, ResponseData, SlugsParams } from './types';
import { ENDPOINT } from './constants';

const getTemplates = (
  params: RequestParams,
  { namespace_slug, project_slug }: SlugsParams,
) =>
  IS_MOCK_ACTIVE
    ? getMockData()
    : api
        .post(ENDPOINT, {
          prefixUrl: '/api',
          body: JSON.stringify(params),
          headers: {
            'x-namespace-slug': namespace_slug,
            'x-project-slug': project_slug,
          },
        })
        .json<ResponseData>();

export const useData = () => {
  const { namespace_slug, project_slug, category_slug } = useParams();

  const queryKey = [
    namespace_slug,
    project_slug,
    category_slug,
    'createService',
  ];

  const { isFetching, data } = useQuery<ResponseData>({
    queryFn: () =>
      getTemplates(
        { category: category_slug },
        { namespace_slug, project_slug },
      ),
    queryKey,
    staleTime: 0,
  });

  const templates = data?.templates || [];

  return {
    templates,
    isFetching,
  };
};
