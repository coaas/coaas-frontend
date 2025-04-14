import { NamespaceWithProject, User } from '@globalTypes/index';
import {
  GetTemplateFiltersResponse,
  GetTemplatesDto,
  UploadArchiveDto,
  Template,
  CheckTemplateNameDto,
} from '@globalTypes/templates';
import {
  TemplateDockerImage,
  TemplateInfo,
  TemplateSettings,
} from '@globalTypes/templates.draft';
import { DraftTemplateResponse } from '@globalTypes/templates.draft.get';

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

export const createTemplateDraft: ApiRequest<{ id: string }> = {
  endpoint: 'TemplateHubService/CreateDraft',
};

export const getTemplateDraft: ApiRequest<
  DraftTemplateResponse,
  { id: string }
> = {
  endpoint: 'TemplateHubService/GetTemplate',
};

export const saveTemplateDraftInfo: ApiRequest<object, TemplateInfo> = {
  endpoint: 'TemplateHubService/UpdateInfo',
};

export const saveTemplateDraftImage: ApiRequest<object, TemplateDockerImage> = {
  endpoint: 'TemplateHubService/UpdateImage',
};

export const saveTemplateDraftSettings: ApiRequest<object, TemplateSettings> = {
  endpoint: 'TemplateHubService/UpdateSettings',
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
