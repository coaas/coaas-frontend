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
