import { GetUserDto, NamespaceWithProject, User } from '@globalTypes/index';
import { GetTemplatesDto, TemplatesData } from '@globalTypes/templates';

export const createNamespace = 'NamespacesManager/CreateNamespace';

export const getUserNamespacesAndProjects: Query<{
  namespaces: NamespaceWithProject;
}> = {
  endpoint: 'NamespacesManager/GetUserNamespacesAndProjectsList',
};

export const getUser: Query<User, GetUserDto> = {
  endpoint: 'UserService/GetUser',
};

export const getTemplates: Query<TemplatesData, GetTemplatesDto> = {
  endpoint: 'TemplateHubService/ListTemplates',
};
