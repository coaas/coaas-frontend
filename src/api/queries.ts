import { NamespaceWithProject, User } from '@globalTypes/index';
import {
  Draft,
  GetTemplateFiltersResponse,
  GetTemplatesDto,
  Template,
  UploadArchiveDto,
} from '@globalTypes/templates';
import {
  MapperForm,
  TemplateDockerImageDto,
  TemplateInfoForm,
  TemplateSettings,
} from '@globalTypes/templates.draft';
import {
  DependencyResponse,
  GetDependenciesDto,
  GetDraftTemplateResponse,
} from '@globalTypes/templates.draft.get';

export const getUserNamespacesAndProjects: ApiRequest<{
  namespaces: NamespaceWithProject;
}> = {
  endpoint: 'NamespacesManager/GetUserNamespacesAndProjectsList',
};

export const getNamespace: ApiRequest<{
  id: string;
  slug: string;
  name: string;
  description: string;
  members_count: number;
  created_at: string;
}> = {
  endpoint: 'NamespacesManager/GetNamespace',
};

export const getProject: ApiRequest<{
  id: string;
  slug: string;
  name: string;
  description: string;
  members_count: number;
  created_at: string;
}> = {
  endpoint: 'ProjectsManager/GetProject',
};

export const getCurrentUserData: ApiRequest<User> = {
  endpoint: 'UserService/GetCurrentUserData',
};

export const getPublicUserData: ApiRequest<
  { username: string },
  { username: string }
> = {
  endpoint: 'UserService/GetPublicUserData',
};

export const getCurrentUserTemplates: ApiRequest<{
  templates: Template[];
  drafts: Draft[];
}> = {
  endpoint: 'TemplateHubService/GetUserTemplates',
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

export const getService: ApiRequest<{
  id: string;
  name: string;
  description: string;
  type: number;
  created_at: string;
}, {
  service_id: string;
}> = {
  endpoint: 'ServicesManager/GetService',
};

export const getProjectTeam: ApiRequest<{
  members: Array<{
    id: string;
    user: {
      id: string;
      first_name: string;
      last_name: string;
      username: string;
      email: string;
    };
  }>;
}> = {
  endpoint: 'ProjectTeamsManager/GetTeam',
};
