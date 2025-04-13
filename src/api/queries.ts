import { NamespaceWithProject, User } from '@globalTypes/index';
import {
  GetTemplateFiltersResponse,
  GetTemplatesDto,
  UploadArchiveDto,
  Template,
  CheckTemplateNameDto,
} from '@globalTypes/templates';

export const createNamespace = 'NamespacesManager/CreateNamespace';

export const getUserNamespacesAndProjects: ApiRequest<{
  namespaces: NamespaceWithProject;
}> = {
  endpoint: 'NamespacesManager/GetUserNamespacesAndProjectsList',
};

export const getCurrentUserData: ApiRequest<User> = {
  endpoint: 'UserService/GetCurrentUserData',
};

export const getTemplates: ApiRequest<
  PaginatedResponse<Template>,
  GetTemplatesDto
> = {
  endpoint: 'TemplateHubService/ListTemplates',
};

export const getTemplateFilters: ApiRequest<GetTemplateFiltersResponse> = {
  endpoint: 'TemplateHubService/GetFilters',
};

export const uploadTemplatesHubArchive: ApiRequest<
  { url: string },
  UploadArchiveDto
> = { endpoint: 'TemplateHubService/UploadArchive' };

export const checkTemplatesNameExistence: ApiRequest<
  object,
  CheckTemplateNameDto
> = {
  endpoint: 'TemplateHubService/SearchTemplatesByName',
};
