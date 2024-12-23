export enum IconType {
  metrics = 'metrics',
  layers = 'layers',
  cube = 'cube',
}

export type IconProps = GenericProps<IconType, SquareIconProps>;

export type SquareIconProps = WithClassname & {
  size: number;
  color?: string;
};
