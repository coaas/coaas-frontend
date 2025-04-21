const conditionItems = [
  { label: 'Any', value: 0 },
  { label: 'On-failure', value: 1 },
  { label: 'Always', value: 2 },
  { label: 'Unless-stopped', value: 3 },
];

const orderItems = [
  { label: 'Stop first', value: 0 },
  { label: 'Stop last', value: 1 },
];

const failureActionItems = [
  { label: 'Pause', value: 0 },
  { label: 'Stop', value: 1 },
  { label: 'RmRF', value: 2 },
];

export const healthCheckFields = [
  { label: 'Test', name: 'test', asNumber: false },
  { label: 'Interval', name: 'interval', asNumber: true },
  { label: 'Timeout', name: 'timeout', asNumber: true },
  { label: 'Retries', name: 'retries', asNumber: true },
  { label: 'Start period', name: 'start_period', asNumber: true },
] as const;

export const restartPolicyFields = [
  {
    label: 'Condition',
    name: 'condition',
    asNumber: true,
    items: conditionItems,
  },
  { label: 'Delay', name: 'delay', asNumber: true },
  { label: 'Max attempts', name: 'max_attempts', asNumber: true },
  { label: 'Window', name: 'window', asNumber: true },
] as const;

export const configItems = [
  { label: 'Parallelism', name: 'parallelism', asNumber: true },
  { label: 'Delay', name: 'delay', asNumber: true },
  { label: 'Monitor', name: 'monitor', asNumber: true },
  { label: 'Max failure ratio', name: 'max_failure_ratio', asNumber: true },
  { label: 'Order', name: 'order', asNumber: true, items: orderItems },
  {
    label: 'Failure action',
    name: 'failure_action',
    asNumber: true,
    items: failureActionItems,
  },
] as const;
