import { useData } from './useData';

export const useCreateServiceForm = () => {
  const { data, isFetching } = useData();

  const isTemplateCustom = false;

  return { isFetching, data, isTemplateCustom };
};
