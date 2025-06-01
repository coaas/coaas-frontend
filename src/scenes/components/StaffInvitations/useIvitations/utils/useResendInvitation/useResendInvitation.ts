import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { api } from '@api/constants';

import { ResendInvitationParams, UseResendInvitationParams } from './types';

const ENDPOINT = 'NamespaceInvitationsManager/ResendInvitation';

const resendInvitation = (
  params: ResendInvitationParams,
  namespaceSlug?: string,
) =>
  api
    .post(ENDPOINT, {
      body: JSON.stringify(params),
      headers: {
        'x-namespace-slug': namespaceSlug,
      },
    })
    .json();

export const useResendInvitation = ({
  onSuccess,
}: UseResendInvitationParams) => {
  const { namespace_slug } = useParams();

  const mutation = useMutation({
    mutationFn: (params: ResendInvitationParams) =>
      resendInvitation(params, namespace_slug),
    onSuccess,
  });

  return mutation;
};
