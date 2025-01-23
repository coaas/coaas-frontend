import { NamespaceWithProject, User } from '@globalTypes/index';
import {
  GetTemplateFiltersResponse,
  GetTemplatesDto,
  TemplatesData,
} from '@globalTypes/templates';

export const createNamespace = 'NamespacesManager/CreateNamespace';

export const getUserNamespacesAndProjects: Query<{
  namespaces: NamespaceWithProject;
}> = {
  endpoint: 'NamespacesManager/GetUserNamespacesAndProjectsList',
};

export const getCurrentUserData: Query<User> = {
  endpoint: 'UserService/GetCurrentUserData',
};

export const getTemplates: Query<TemplatesData, GetTemplatesDto> = {
  endpoint: 'TemplateHubService/ListTemplates',
};

export const getTemplateFilters: Query<GetTemplateFiltersResponse> = {
  endpoint: 'TemplateHubService/GetFilters',
};
