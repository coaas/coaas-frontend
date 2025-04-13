export const requiredRule = { required: 'Field is Required' };
export const numberRule = {
  pattern: { value: /\d/gi, message: 'wrong format' },
};

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

export const ports = Array.from({ length: 9 }, (_, i) => i).map(idx => ({
  label: `808${idx + 1}`,
  value: `808${idx + 1}`,
}));

export const dependencies = [
  { label: 'Nginx', value: 'Nginx' },
  { label: 'Telegram Bot', value: 'Telegram Bot' },
  { label: 'Prometheus', value: 'Prometheus' },
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
