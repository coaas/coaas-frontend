import { ColorMode } from './types';

export const DEFAULT_COLOR_MODE: ColorMode = 'standart';

export const COLOR_MODE_MAP: Record<ColorMode, string> = {
  standart: 'border-stroke-gray bg-area-dark',
  transparent: 'border-stroke-blue',
};
