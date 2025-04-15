import { IconType } from '@components/Icon';
import { RouteMap } from '@components/Layout/components/types';

export const navLinks = [
  {
    label: 'Template Info',
    href: RouteMap.templatesCreateStepInfo,
    iconType: IconType.cube,
  },
  {
    label: 'Template Image',
    href: RouteMap.templatesCreateStepImage,
    iconType: IconType.cube,
  },
  {
    label: 'Template Settings',
    href: RouteMap.templatesCreateStepSettings,
    iconType: IconType.cube,
  },
  {
    label: 'Template Mapper',
    href: RouteMap.templatesCreateStepMapper,
    iconType: IconType.cube,
  },
];

export const requiredRule = { required: 'Field is Required' };
export const numberRule = {
  pattern: { value: /\d/gi, message: 'wrong format' },
};

export const InfoTabsData = [
  { id: '0', label: 'Managed', value: 0 },
  { id: '1', label: 'Custom', value: 1 },
];

export const conditionItems = [
  { label: 'Any', value: 0 },
  { label: 'On-failure', value: 1 },
  { label: 'Always', value: 2 },
  { label: 'Unless-stopped', value: 3 },
];

export const orderItems = [
  { label: 'Stop first', value: 0 },
  { label: 'Stop last', value: 1 },
];

export const failureActionItems = [
  { label: 'Pause', value: 0 },
  { label: 'Stop', value: 1 },
  { label: 'RmRF', value: 2 },
];
