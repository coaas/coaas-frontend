import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
} from '@components/Modal';

export const ModalWarning = ({
  text,
  title,
  onChange,
  Action,
}: {
  title: string;
  text: string;
  onChange: (open: boolean) => void;
  Action: React.ReactNode;
}) => {
  return (
    <Modal open onOpenChange={onChange}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
        </ModalHeader>
        <div>{text}</div>
        <div className="mt-4">{Action}</div>
      </ModalContent>
    </Modal>
  );
};
