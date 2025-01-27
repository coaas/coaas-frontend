import { CreateNamespaceParams } from '../../types';

export type OnFormSubmit = (params: CreateNamespaceParams) => void;

export type ModalProps = {
  isOpen: boolean;
  onIsOpenChange: (isOpen: boolean) => void;
  onFormSubmit: OnFormSubmit;
};
