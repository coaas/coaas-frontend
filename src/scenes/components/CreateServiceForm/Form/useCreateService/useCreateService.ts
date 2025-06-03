import { useMutation } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { api } from '@api/constants';

import { FormState } from '../types';

const ENDPOINT = 'ServicesManager/CreateService';

interface CreateServiceResponse {
  id: string;
  name: string;
  description: string;
  type: number;
  created_at: string;
}

export const useCreateService = () => {
  const navigate = useNavigate();
  const { namespace_slug, project_slug, template_id } = useParams();

  const mutation = useMutation({
    mutationFn: (params: FormState) =>
      api.post(ENDPOINT, {
        prefixUrl: '/api',
        body: JSON.stringify({
          name: params.name,
          description: params.description,
          provided_env_vars: params.settings.env_vars.reduce(
            (acc, { key, value }) => ({ ...acc, [key]: value }),
            {},
          ),
          ports: params.settings.ports,
          health_check: params.healthCheck,
          image: params.imageParams.url,
          version: params.imageParams.version,
          template_id,
        }),
        headers: {
          'x-namespace-slug': namespace_slug,
          'x-project-slug': project_slug,
        },
      }),
    onSuccess: async response => {
      const data = (await response.json()) as CreateServiceResponse;
      navigate(
        `/namespaces/${namespace_slug}/projects/${project_slug}/services/${data.id}`,
      );
    },
  });

  return mutation;
};
