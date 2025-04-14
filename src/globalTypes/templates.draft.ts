export interface State {
  state: StateType;
  id: string;
}

export enum StateType {
  draft = 0,
  edit = 1,
}

export interface TemplateInfo extends State {
  name: string;
  description: string;
  docs: string;
  categories: string[];
  languages: string[];
}

export interface TemplateDockerImage extends State {
  type: TemplateType;
  managed?: Managed;
  custom?: Custom;
}

export interface TemplateSettings extends State {
  settings: Settings;
  dependencies: string[];
}

export const enum TemplateType {
  managed = 0,
  custom = 1,
}

export interface Managed {
  url: string;
  versions: string[];
}

export interface Custom {
  dockerfiles: Dockerfiles;
  sources_uri: string;
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
  outputs: Outputs;
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

export interface Outputs {
  secrets: Secret2[];
  configs: Config2[];
}

export interface Secret2 {
  name: string;
  value: string;
  protected: boolean;
}

export interface Config2 {
  path: string;
  value: string;
  protected: boolean;
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
