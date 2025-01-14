export enum IconType {
  metrics = 'metrics',
  layers = 'layers',
  cube = 'cube',
  graph = 'graph',
  template = 'template',
  settings = 'settings',
  support = 'support',
  doubleArrow = 'doubleArrow',
}

export type IconProps = GenericProps<IconType, SquareIconProps>;

export type SquareIconProps = WithClassname & {
  size: number;
  color?: string;
};
