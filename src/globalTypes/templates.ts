export interface GetTemplatesResponse {
  has_more: boolean;
  next_key: NextKey | null;
  templates: Template[];
}

export interface GetTemplatesDto {
  query?: string;
  filters: TemplatesFiltersRequest;
  limit?: number;
  after_key?: AfterKey;
}

export interface TemplatesFiltersRequest {
  types: number[];
  status: number[];
  categories: string[];
  languages: string[];
}

export type GetTemplateFiltersResponse = {
  categories: Filter[];
  languages: Filter[];
};

export type Filter = {
  key: string;
  value: string;
};

export interface Template {
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

export interface UploadArchiveDto {
  state: number;
  id: string;
  filename: string;
  chunk: string;
}
