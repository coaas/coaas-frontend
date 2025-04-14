import {
  TemplateInfo,
  Settings,
  Mapper,
  Managed,
  Custom,
} from './templates.draft';

export interface DraftTemplateResponse {
  info: TemplateInfo & { created_at: string };
  managed: Managed;
  custom: Custom;
  settings: Settings;
  dependencies: string[];
  mapper: Mapper;
}
