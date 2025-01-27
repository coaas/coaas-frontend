import { FieldId } from './InputSection';
import { GetIsSlugExist } from './useCheckSlugMutation';

export type SlugEntityParams = {
  name: string;
  description: string;
  slug: string;
};

export type OnFormSubmit = (params: SlugEntityParams) => void;

export type SlugEntityModalProps = {
  title: string;
  buttonTitle: string;
  isOpen: boolean;
  onIsOpenChange: (isOpen: boolean) => void;
  onFormSubmit: OnFormSubmit;
  getIsSlugExist: GetIsSlugExist;
};

export type Field = {
  label: string;
  id: FieldId;
};
