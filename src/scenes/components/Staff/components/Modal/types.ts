export type ModalProps = {
  isOpen: boolean;
  onIsOpenChange: (isOpen: boolean) => void;
  refetch?: () => void;
};
