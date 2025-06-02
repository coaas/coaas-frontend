import { useUrlDraft } from './use-url-draft';
import { useUrlDefaultValues } from './use-url-default-values';

export const useDraftContext = () => {
  const urlContext = useUrlDraft();
  const urlDefaultValues = useUrlDefaultValues();

  return {
    ...urlContext,
    defaultValues: urlDefaultValues,
    deleteDraftId: () => {}, // Для URL не нужно удалять из localStorage
    isUrlBased: true,
  };
}; 