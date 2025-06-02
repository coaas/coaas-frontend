import { ColorMode } from './types';

export const DEFAULT_COLOR_MODE: ColorMode = 'standart';

export const COLOR_MODE_MAP: Record<ColorMode, string> = {
  standart:
    'border-stroke-gray dark:border-stroke-gray border-gray-200 bg-area-dark dark:bg-area-dark bg-gray-50',
  transparent: 'border-stroke-blue border-blue',
};
