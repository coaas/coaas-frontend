import { UseFormRegister } from 'react-hook-form';

export type FieldId = 'name' | 'description' | 'slug';

export type InputSectionProps = {
  label: string;
  id: FieldId;
  register: UseFormRegister<Record<FieldId, string>>;
  isSlugCheckingPending: boolean;
  onSlugChange: (slug: string) => void;
  isSlugValid?: boolean;
  isInvalid?: boolean;
};
