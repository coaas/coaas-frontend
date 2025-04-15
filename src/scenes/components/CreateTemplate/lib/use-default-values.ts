import { getTemplateDraft } from '@api/queries';
import { StateType } from '@globalTypes/templates.draft';
import { useApiQuery } from '@utils/lib/use-api-query';

export const useDefaultValues = (draftId: string | null) => {
  const { data: draftResponse } = useApiQuery({
    request: getTemplateDraft,
    payload: { id: draftId },
  });

  if (!draftResponse) return null;

  const { managed, custom, info, settings, dependencies } = draftResponse;

  const { ports, ...restSettings } = settings;

  const { id, type, status, name, description, languages, categories, docs } =
    info;

  const { url, versions } = managed;

  const state = { id, state: StateType.draft };

  const draftInfo = {
    ...state,
    name,
    description,
    languages,
    categories,
    docs,
  };

  const dockerImage = {
    ...state,
    type,
    managed: { url, versions: versions.map(version => ({ name: version })) },
    custom,
  };

  const draftSettings = {
    settings: { ...restSettings, ports: ports.map(port => ({ name: port })) },
    dependencies,
  };

  return { draftInfo, dockerImage, draftSettings, status };
};
