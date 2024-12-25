import { FC, useState } from 'react';

import { Button } from '@components/Button';

import { Modal, ModalContent, ModalHeader, ModalTitle } from '..';

export const Default: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onClose = () => setIsModalOpen(false);
  const onOpen = () => setIsModalOpen(true);

  return (
    <div className="p-10">
      <Button onClick={onOpen}>Open modal</Button>
      <Modal open={isModalOpen} onOpenChange={setIsModalOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>New namespace</ModalTitle>
          </ModalHeader>
          <Button onClick={onClose} variant="outline">
            Close modal
          </Button>
        </ModalContent>
      </Modal>
    </div>
  );
};

const meta = {
  title: 'components/Modal',
  component: Default,
};

export default meta;
