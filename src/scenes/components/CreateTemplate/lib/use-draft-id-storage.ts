import { createTemplateDraft } from '@api/queries';
import { useApiQuery } from '@utils/lib/use-api-query';
import { useEffect, useState } from 'react';

const DRAFT_ID_KEY = 'draft-id';

export const useDraftIdStorage = () => {
  const [draftId, setDraftId] = useState(localStorage.getItem(DRAFT_ID_KEY));

  const { data, isLoading } = useApiQuery({
    request: createTemplateDraft,
    options: { enabled: !draftId },
  });

  const createdId = data?.id;

  useEffect(() => {
    if (createdId) {
      setDraftId(createdId);
      localStorage.setItem(DRAFT_ID_KEY, createdId);
    }
  }, [createdId]);

  const deleteDraftId = () => localStorage.removeItem(DRAFT_ID_KEY);

  return { draftId, setDraftId, isLoading, deleteDraftId };
};
