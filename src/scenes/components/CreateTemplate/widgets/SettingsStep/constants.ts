const conditionItems = [
  { label: 'None', value: 0 },
  { label: 'On-failure', value: 1 },
  { label: 'Any', value: 2 },
];

const orderItems = [
  { label: 'Stop first', value: 0 },
  { label: 'Stop last', value: 1 },
];

const failureActionItems = [
  { label: 'Continue', value: 0 },
  { label: 'Pause', value: 1 },
  { label: 'Rollback', value: 2 },
];

const rollbackFailureActionItems = [
  { label: 'Continue', value: 0 },
  { label: 'Pause', value: 1 },
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

export const rollbackConfigItems = [
  { label: 'Parallelism', name: 'parallelism', asNumber: true },
  { label: 'Delay', name: 'delay', asNumber: true },
  { label: 'Monitor', name: 'monitor', asNumber: true },
  { label: 'Max failure ratio', name: 'max_failure_ratio', asNumber: true },
  { label: 'Order', name: 'order', asNumber: true, items: orderItems },
  {
    label: 'Failure action',
    name: 'failure_action',
    asNumber: true,
    items: rollbackFailureActionItems,
  },
] as const;
