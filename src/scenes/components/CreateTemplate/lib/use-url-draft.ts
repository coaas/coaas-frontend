import { getTemplateDraft } from '@api/queries';
import { useApiQuery } from '@utils/lib/use-api-query';
import { useParams } from 'react-router-dom';

export const useUrlDraft = () => {
  const { draft_id } = useParams<{ draft_id: string }>();

  const { isLoading: draftDataLoading, data: draftData } = useApiQuery({
    request: getTemplateDraft,
    payload: { id: draft_id },
    requestOptions: {
      prefixUrl: '/api',
    },
    options: { enabled: !!draft_id },
  });

  return {
    draftId: draft_id,
    isLoading: draftDataLoading,
    draftData,
  };
};
