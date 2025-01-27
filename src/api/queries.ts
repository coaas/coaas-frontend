import { GetUserDto, NamespaceWithProject, User } from '@globalTypes/index';

export const createNamespace = 'NamespacesManager/CreateNamespace';

export const getUserNamespacesAndProjects: Query<{
  namespaces: NamespaceWithProject;
}> = {
  endpoint: 'NamespacesManager/GetUserNamespacesAndProjectsList',
};

export const getUser: Query<User, GetUserDto> = {
  endpoint: 'UserService/GetUser',
};
