export interface GetDraftTemplateResponse {
  info: Info;
  managed: Managed;
  custom: Custom;
  settings: Settings;
  dependencies: string[];
  mapper: Mapper;
}

export interface GetDependenciesDto {
  name: string;
  limit: number;
}

export interface DependencyResponse {
  templates: Dependency[];
}

export interface Dependency {
  id: string;
  name: string;
}

export interface Info {
  id: string;
  created_at: string;
  name: string;
  description: string;
  docs: string;
  type: number;
  status: number;
  categories: string[];
  languages: string[];
  author: Author;
  downloads: number;
  stars: number;
}

export interface Author {
  id: string;
  username: string;
}

export interface Managed {
  url: string;
  versions: string[];
}

export interface Custom {
  dockerfiles: Dockerfiles;
}

export interface Dockerfiles {
  development: string;
  test: string;
  production: string;
}

export interface Settings {
  secrets: Secret[];
  configs: Config[];
  env_vars: EnvVar[];
  ports: string[];
  health_check: HealthCheck;
  deployment: Deployment;
}

export interface Secret {
  name: string;
}

export interface Config {
  path: string;
}

export interface EnvVar {
  key: string;
  value: string;
}

export interface HealthCheck {
  test: string;
  interval: number;
  timeout: number;
  retries: number;
  start_period: number;
}

export interface Deployment {
  restart_policy: RestartPolicy;
  update_config: UpdateConfig;
  rollback_config: RollbackConfig;
}

export interface RestartPolicy {
  condition: number;
  delay: number;
  max_attempts: number;
  window: number;
}

export interface UpdateConfig {
  parallelism: number;
  delay: number;
  monitor: number;
  max_failure_ratio: number;
  order: number;
  failure_action: number;
}

export interface RollbackConfig {
  parallelism: number;
  delay: number;
  monitor: number;
  max_failure_ratio: number;
  order: number;
  failure_action: number;
}

export interface Mapper {
  type: number;
  custom: CustomMapper;
  external: External;
}

export interface CustomMapper {
  blocks: Block[];
}

export interface Block {
  name: string;
  fields: Field[];
}

export interface Field {
  type: number;
  label: string;
  placeholder: string;
  variable: string;
}

export interface External {
  url: string;
}
