import { MapperType, TemplateType } from '@globalTypes/templates.draft';

export const requiredRule = { required: 'Field is Required' };
export const numberRule = {
  pattern: { value: /\d/gi, message: 'wrong format' },
};

export const InfoTabsData = [
  { id: '0', label: 'Managed', value: TemplateType.managed },
  { id: '1', label: 'Custom', value: TemplateType.custom },
];

export const MapperTabsData = [
  { id: '0', label: 'Managed', value: MapperType.managed },
  { id: '1', label: 'Custom', value: MapperType.custom },
  { id: '2', label: 'External', value: MapperType.custom },
];
