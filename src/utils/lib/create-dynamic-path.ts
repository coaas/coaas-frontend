export type DynamicPathParams = {
  path: string;
  namespace_slug?: string;
  project_slug?: string;
};

export const createDynamicPath = ({
  path,
  namespace_slug = '',
  project_slug = '',
}: DynamicPathParams) =>
  path
    .replace(':namespace_slug', namespace_slug)
    .replace(':project_slug', project_slug);
