import { CreateNamespaceParams } from '../../types';
import { FieldId } from './InputSection';

export type OnFormSubmit = (params: CreateNamespaceParams) => void;

export type ModalProps = {
  isOpen: boolean;
  onIsOpenChange: (isOpen: boolean) => void;
  onFormSubmit: OnFormSubmit;
};

export type Field = {
  label: string;
  id: FieldId;
};
