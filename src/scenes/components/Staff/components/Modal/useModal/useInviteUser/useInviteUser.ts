import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { api } from '@api/constants';

import { UseInviteUserParams, InviteFormSubmit } from './types';

const ENDPOINT = 'NamespaceInvitationsManager/InviteMember';

const inviteUser = (params: InviteFormSubmit, namespaceSlug?: string) =>
  api
    .post(ENDPOINT, {
      prefixUrl: '/api',
      body: JSON.stringify(params),
      headers: {
        'x-namespace-slug': namespaceSlug,
      },
    })
    .json();

export const useInviteUser = ({ onSuccess }: UseInviteUserParams) => {
  const { namespace_slug } = useParams();

  const mutation = useMutation({
    mutationFn: (params: InviteFormSubmit) =>
      inviteUser(params, namespace_slug),
    onSuccess,
  });

  return mutation;
};
