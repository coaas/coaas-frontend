import { useForm } from 'react-hook-form';
import { CreateTemplateForm, TemplateType } from './types';

export const useFormMethods = () => {
  const methods = useForm<CreateTemplateForm>({
    defaultValues: {
      info: { categories: [], languages: [] },
      image: { type: TemplateType.managed, managed: { versions: [] } },
    },
  });

  return { methods };
};
