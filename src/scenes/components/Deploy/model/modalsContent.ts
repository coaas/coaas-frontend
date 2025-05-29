import { ServerType } from '@scenes/components/Deploy/model/dataCenter.types.ts';
import {
  Content,
  ModalOption,
} from '@scenes/components/Deploy/components/Common/ModalView.tsx';

export type ContentIds<
  T extends (...args: never[]) => readonly Content[],
  K = ReturnType<T>[number],
> = K extends Content ? K['label']['id'] : never;

type AddServerToClusterContent = {
  selectedClusterId: string;
  nodeIds?: ModalOption[];
  isDockerApi?: boolean;
  isNotFoundNodeIds?: boolean;
};

const isManager = [
  {
    type: 'select',
    label: { id: 'is_manager', label: 'Type of the client' },
    placeholder: 'Select the type...',
    options: [
      { id: 'manager', value: 'Manager' },
      { id: 'worker', value: 'Worker' },
    ],
  },
] as const;

const getRemainServer = (nodeIds: ModalOption[]) =>
  [
    {
      type: 'select',
      label: { id: 'node_id', label: 'Node id' },
      placeholder: 'Select the node id...',
      options: nodeIds,
    },
  ] as const;

export const dockerApi = [
  {
    type: 'input',
    label: { id: 'url', label: 'Docker url' },
    placeholder: 'Input docker url...',
  },
  {
    type: 'input',
    label: { id: 'token', label: 'Api token' },
    placeholder: 'Input api token...',
  },
] as const;

export const getAddServerToClusterContent = ({
  selectedClusterId,
  nodeIds,
  isDockerApi = true,
}: AddServerToClusterContent) =>
  [
    {
      type: 'input',
      defaultValue: selectedClusterId,
      label: { id: 'cluster_id', label: 'Cluster id' },
      disabled: true,
    },
    ...(nodeIds ? isManager : []),
    ...(nodeIds ? getRemainServer(nodeIds) : []),
    {
      type: 'select',
      label: { id: 'type', label: 'Choose type of the server' },
      placeholder: 'Select the type...',
      options: [
        {
          id: ServerType.PERSONAL.toString(),
          value: 'Personal',
        },
        {
          id: ServerType.SHARED.toString(),
          value: 'Shared',
          disabled: true,
        },
        {
          id: ServerType.PURCHASED.toString(),
          value: 'Purchased',
          disabled: true,
        },
      ],
    },
    {
      type: 'input',
      label: { id: 'region', label: 'Region' },
      placeholder: 'Input region...',
    },
    {
      type: 'input',
      label: { id: 'availability_zone', label: 'Availability zone' },
      placeholder: 'Input availability zone...',
    },
    {
      type: 'input',
      label: { id: 'provider', label: 'Provider' },
      placeholder: 'Input provider...',
    },
    {
      type: 'input',
      label: { id: 'name', label: 'Name' },
      placeholder: 'Input name...',
    },
    {
      type: 'input',
      isNumber: true,
      defaultValue: '1',
      label: { id: 'cpu', label: 'CPU' },
    },
    {
      type: 'input',
      isNumber: true,
      defaultValue: '1024',
      label: { id: 'ram', label: 'RAM' },
    },
    {
      type: 'input',
      isNumber: true,
      defaultValue: '10',
      label: { id: 'disk', label: 'Disk' },
    },
    {
      type: 'input',
      label: { id: 'ip', label: 'IP' },
      placeholder: 'Input IP...',
    },
    ...(isDockerApi ? dockerApi : []),
  ] as const;
