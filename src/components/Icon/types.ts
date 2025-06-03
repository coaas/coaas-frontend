export enum IconType {
  metrics = 'metrics',
  layers = 'layers',
  cube = 'cube',
  graph = 'graph',
  template = 'template',
  settings = 'settings',
  support = 'support',
  doubleArrow = 'doubleArrow',
  git = 'git',
  deploy = 'deploy',
  secret = 'secret',
  config = 'config',
  chevron = 'chevron',
  search = 'search',
  hint = 'hint',
  user = 'user',
  lambda = 'lambda',
  star = 'star',
  menu = 'menu',
  logout = 'logout',
}

export type IconProps = GenericProps<IconType, SquareIconProps>;

export type SquareIconProps = WithClassname & {
  size: number;
  color?: string;
};
