export const enum RouteMap {
  home = '/',
  login = '/login',
  logout = '/logout',
  register = '/register',
  namespaces = '/namespaces',
  namespace = '/namespaces/:namespace_slug',
  templates = '/templates',
  currentUserTemplates = '/templates/my',
  template = '/templates/:template_slug',
  templatesCreateStepInfo = '/templates/create/info',
  templatesCreateStepImage = '/templates/create/image',
  templatesCreateStepSettings = '/templates/create/settings',
  templatesCreateStepMapper = '/templates/create/mapper',
  projects = '/namespaces/:namespace_slug/projects',
  createProject = '/namespaces/:namespace_slug/projects/create',
  project = '/namespaces/:namespace_slug/projects/:project_slug',
  staff = '/namespaces/:namespace_slug/staff',
  billing = '/namespaces/:namespace_slug/billing',
  services = '/namespaces/:namespace_slug/projects/:project_slug/services',
  networks = '/namespaces/:namespace_slug/projects/:project_slug/networks',
  volumes = '/namespaces/:namespace_slug/projects/:project_slug/volumes',
  configs = '/namespaces/:namespace_slug/projects/:project_slug/configs',
  secrets = '/namespaces/:namespace_slug/projects/:project_slug/secrets',
  deploy = '/namespaces/:namespace_slug/projects/:project_slug/deploy',
  deployedService = '/namespaces/:namespace_slug/projects/:project_slug/deploy/:service_id',
  git = '/namespaces/:namespace_slug/projects/:project_slug/git',
  registries = '/namespaces/:namespace_slug/projects/:project_slug/registries',
  team = '/namespaces/:namespace_slug/projects/:project_slug/team',
}
