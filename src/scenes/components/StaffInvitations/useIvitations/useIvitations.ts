import { useState } from 'react';

import { useData, Invitation } from './useData';
import { getParsedData, useResendInvitation } from './utils';

export const useIvitations = () => {
  const { data, refetch, ...rest } = useData();

  const resendMutation = useResendInvitation({ onSuccess: refetch });

  const resendInvitation = (invitation: Invitation) =>
    resendMutation.mutate({ invitation_id: invitation.id });

  const { invitations } = getParsedData(data);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const onModalOpen = () => setIsModalOpen(true);

  return {
    invitations,
    isModalOpen,
    setIsModalOpen,
    onModalOpen,
    resendInvitation,
    ...rest,
  };
};
