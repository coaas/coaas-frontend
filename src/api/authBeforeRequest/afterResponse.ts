import { AfterResponseHook } from 'ky';
import { obtainAccess } from '@api/authBeforeRequest/beforeRequest.ts';

export const afterResponse: AfterResponseHook = async (
  _request,
  _options,
  response,
) => {
  if ([401, 404].includes(response.status)) {
    await obtainAccess();
  }
};
