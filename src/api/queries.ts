import { NamespaceWithProject, User } from '@globalTypes/index';
import {
  GetTemplateFiltersResponse,
  GetTemplatesDto,
  UploadArchiveDto,
  Template,
} from '@globalTypes/templates';
import {
  MapperForm,
  TemplateDockerImageDto,
  TemplateInfoForm,
  TemplateSettings,
} from '@globalTypes/templates.draft';
import {
  DependencyResponse,
  GetDraftTemplateResponse,
  GetDependenciesDto,
} from '@globalTypes/templates.draft.get';

export const getUserNamespacesAndProjects: ApiRequest<{
  namespaces: NamespaceWithProject;
}> = {
  endpoint: 'NamespacesManager/GetUserNamespacesAndProjectsList',
};

export const getCurrentUserData: ApiRequest<User> = {
  endpoint: 'UserService/GetCurrentUserData',
};

export const getMyTemplates: ApiRequest<
  PaginatedResponse<Template>,
  GetTemplatesDto
> = {
  endpoint: 'TemplateHubService/ListMyTemplates',
};

export const getTemplates: ApiRequest<
  PaginatedResponse<Template>,
  GetTemplatesDto
> = {
  endpoint: 'TemplateHubService/ListTemplates',
};

export const getTemplate: ApiRequest<GetDraftTemplateResponse, { id: string }> =
  {
    endpoint: 'TemplateHubService/GetTemplate',
  };

export const createTemplateDraft: ApiRequest<{ id: string }> = {
  endpoint: 'TemplateHubService/CreateDraft',
};

export const getTemplateDraft: ApiRequest<
  GetDraftTemplateResponse,
  { id: string }
> = {
  endpoint: 'TemplateHubService/GetTemplateDraft',
};

export const saveTemplateDraftInfo: ApiRequest<object, TemplateInfoForm> = {
  endpoint: 'TemplateHubService/UpdateInfo',
};

export const saveTemplateDraftImage: ApiRequest<
  object,
  TemplateDockerImageDto
> = {
  endpoint: 'TemplateHubService/UpdateImage',
};

export const saveTemplateDraftSettings: ApiRequest<object, TemplateSettings> = {
  endpoint: 'TemplateHubService/UpdateSettings',
};

export const saveTemplateDraftMapper: ApiRequest<object, MapperForm> = {
  endpoint: 'TemplateHubService/UpdateMapper',
};

export const publishTemplateDraft: ApiRequest<object, { id: string }> = {
  endpoint: 'TemplateHubService/CommitDraft',
};

export const getTemplateFilters: ApiRequest<GetTemplateFiltersResponse> = {
  endpoint: 'TemplateHubService/GetFilters',
};

export const uploadTemplatesHubArchive: ApiRequest<
  { url: string },
  UploadArchiveDto
> = { endpoint: 'TemplateHubService/UploadArchive' };

export const checkTemplateNameExistence: ApiRequest<
  DependencyResponse,
  GetDependenciesDto
> = {
  endpoint: 'TemplateHubService/SearchTemplatesByName',
};

export const getTemplateDependencies: ApiRequest<
  DependencyResponse,
  GetDependenciesDto
> = {
  endpoint: 'TemplateHubService/SearchTemplatesByName',
};
