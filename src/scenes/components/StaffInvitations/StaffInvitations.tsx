import { FC } from 'react';

import { Button } from '@components/Button';

import { Modal } from '../Staff/components';
import { useIvitations } from './useIvitations';
import { Table } from './components';

export const StaffInvitations: FC = () => {
  const {
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    invitations,
    isModalOpen,
    setIsModalOpen,
    onModalOpen,
    resendInvitation,
  } = useIvitations();

  return (
    <>
      <Modal isOpen={isModalOpen} onIsOpenChange={setIsModalOpen} />
      <section className="p-10 items-center">
        <div className="flex gap-4 mb-5">
          <Button onClick={onModalOpen}>Invite member</Button>
          <a href="./staff">
            <Button variant="secondary">Back to staff</Button>
          </a>
        </div>
        <Table
          isLoading={isFetching}
          isLoadingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
          invitations={invitations}
          resendInvitation={resendInvitation}
        />
      </section>
    </>
  );
};
