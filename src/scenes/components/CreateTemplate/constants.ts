export const commonValidationRules = { required: 'Field is Required' };

export const InfoTabsData = [
  { id: '0', label: 'Managed', value: 0 },
  { id: '1', label: 'Custom', value: 1 },
];

export const versions = Array.from({ length: 10 }, (_, i) => i)
  .map(idx => ({
    label: `v${idx}.0${idx}`,
    value: `v${idx}.0${idx}`,
  }))
  .concat({ label: 'latest', value: 'latest' });
