import { RequestParams } from './types';

export const ENDPOINT = 'NamespaceStaffManager/GetNamespaceStaff';

export const BASE_REQUEST_PARAMS: Omit<RequestParams, 'is_fired'> = {
  limit: 20,
};
