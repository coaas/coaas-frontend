import { AfterResponseHook } from 'ky';
import { obtainAccess } from '@api/authBeforeRequest/beforeRequest.ts';

const ENDPOINTS_TO_REFRESH = [
  'NamespacesManager/CreateNamespace',
  'ProjectsManager/CreateProject',
];

export const afterResponse: AfterResponseHook = async (
  _request,
  _options,
  response,
) => {
  if (
    ([401, 404].includes(response.status) &&
      ['Session not found', 'Token expired'].includes(
        (await response.json<Record<string, string>>()).value,
      )) ||
    ENDPOINTS_TO_REFRESH.some(e => response.url.includes(e))
  ) {
    await obtainAccess();
  }
};
