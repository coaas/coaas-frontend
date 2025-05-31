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
    response.status === 401 ||
    ENDPOINTS_TO_REFRESH.some(e => response.url.includes(e)) ||
    (response.status === 403 &&
      (await response
        .text()
        .then(text => text.includes('CSRF token verification failed'))))
  ) {
    await obtainAccess();
  }
};
