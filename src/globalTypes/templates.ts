export interface GetTemplatesDto {
  query?: string;
  filters: Filters;
  limit?: number;
  after_key?: AfterKey;
}

export interface Filters {
  types: number[];
  categories: string[];
  languages: string[];
}

export interface AfterKey {
  id: string;
  created_at: string;
}

export interface TemplatesData {
  templates: Template[];
  has_more: boolean;
  next_key: NextKey;
}

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

export interface NextKey {
  id: string;
  created_at: string;
}
