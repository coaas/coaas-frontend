import {
  TemplateInfo,
  Settings,
  Mapper,
  Managed,
  Custom,
} from './templates.draft';

export interface DraftTemplateResponse {
  info: TemplateInfo;
  managed: Managed;
  custom: Custom;
  settings: Settings;
  dependencies: string[];
  mapper: Mapper;
}

export interface GetDependenciesDto {
  name: string;
  limit: 0;
}

export interface DependencyResponse {
  templates: Dependency[];
}

export interface Dependency {
  id: string;
  name: string;
}
