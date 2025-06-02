import { Heading } from '../Common/Heading.tsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import {
  addDeployRule,
  addServiceClusterDeployInfo,
  deployedOptions,
} from '../../api/getDeployed.ts';
import { Cluster } from '../Clusters/Cluster.tsx';
import { ClusterType, Status } from '../../model/cluster.types.ts';
import { Server } from '../Clusters/Server.tsx';
import { isFixedRule } from '../../utils/checkers.ts';
import { DataCenter } from '../DataCenters/DataCenters.tsx';
import { ClustersResponse } from '../../api/getDeploy.ts';
import { useMemo, useState } from 'react';
import { pick, xorBy } from 'lodash';
import { queryClient } from '@api/constants.ts';
import { DeployButton } from '../Common/DeployButton.tsx';
import { ModalView } from '../Common/ModalView.tsx';
import { convertTypes } from '../../utils/converters.ts';
import { DeployMode } from '../../model/deployed.types.ts';

export const DeployRules = ({ clusters }: { clusters: ClustersResponse }) => {
  const { service_id } = useParams<{ service_id: string }>();
  const {
    data: ruleClusters,
    isError,
    isPending,
  } = useQuery(deployedOptions(service_id ?? ''));

  const { mutate: addClusterMode } = useMutation({
    mutationFn: addServiceClusterDeployInfo,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: deployedOptions(service_id ?? '').queryKey,
      });
    },
  });

  const { mutate: addServerRule } = useMutation({
    mutationFn: addDeployRule,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: deployedOptions(service_id ?? '').queryKey,
      });
    },
  });

  const [modalType, setModalType] = useState<'cluster' | 'server' | boolean>(
    false,
  );
  const [selectClusterId, setSelectClusterId] = useState<string | null>(null);
  const [serverInfo, setServerInfo] = useState({ cpu: '', ram: '', disk: '' });

  const noneRulesClusters = useMemo(
    () =>
      xorBy(
        ruleClusters?.clusters.map(c =>
          pick(c.info, ['id', 'name', 'region', 'provider']),
        ),
        clusters.clusters,
        'id',
      ),
    [clusters, ruleClusters],
  );

  const selectedCluster = useMemo(
    () => clusters.clusters.find(s => s.id === selectClusterId),
    [selectClusterId, clusters],
  );

  if (isError || isPending || !service_id) {
    return null;
  }

  return (
    <>
      <div className="my-8 self-start">
        <Heading>Deploy rules</Heading>
      </div>
      <div className="flex flex-col gap-6 w-full">
        {ruleClusters?.clusters.map(cluster => (
          <Cluster
            key={cluster.info.id}
            isHidden={clusters.type === ClusterType.SERVERS}
            renderServer={rule =>
              isFixedRule(rule) && (
                <Server
                  key={rule.id}
                  name={rule.node.name}
                  type={'deployRules'}
                  clusterType={ClusterType.SERVERS}
                  renderInstance={() => null}
                  status={Status.UNKNOWN}
                  disk={rule.disk}
                  cpu={rule.cpu}
                  ram={rule.ram}
                  id={rule.id ?? ''}
                  instances={[]}
                />
              )
            }
            name={[
              cluster.info.provider,
              cluster.info.region,
              cluster.info.name,
            ].join(', ')}
            clusterType={clusters.type}
            servers={cluster.fixed_rules?.rules ?? []}
            AddView={
              <DataCenter
                type={'add'}
                w={'[385px]'}
                onAdd={() => {
                  setModalType('server');
                  setSelectClusterId(cluster.info.id);
                }}
              />
            }
          />
        ))}
        {clusters.type === ClusterType.REGIONS &&
          noneRulesClusters.map(cluster => (
            <Cluster
              name={[cluster.provider, cluster.region, cluster.name].join(', ')}
              clusterType={ClusterType.REGIONS}
              renderServer={() => (
                <button
                  onClick={() => {
                    setModalType('cluster');
                    setSelectClusterId(cluster.id);
                  }}
                  className="bg-area flex-1 text-xl text-center py-3 font-medium rounded-lg"
                >
                  Deploy
                </button>
              )}
              servers={[clusters.clusters[0].servers[0]]}
            />
          ))}
      </div>
      {modalType === 'cluster' && selectClusterId && (
        <ModalView
          onChange={setModalType}
          title={'Deploy service in cluster'}
          content={[
            {
              type: 'select',
              label: { id: 'cluster_id', label: 'Choose cluster' },
              options: noneRulesClusters.map(c => ({
                id: c.id,
                value: c.name,
              })),
              placeholder: 'Select cluster',
              defaultValue: selectClusterId,
            },
            {
              type: 'select',
              label: { id: 'mode', label: 'Choose mode' },
              options: [
                { id: DeployMode.FIXED.toString(), value: 'Fixed' },
                {
                  id: DeployMode.AUTO_SCALE.toString(),
                  value: 'Auto scale',
                  disabled: true,
                },
                {
                  id: DeployMode.AUTO_SELECTION.toString(),
                  value: 'Auto selection',
                  disabled: true,
                },
              ],
              placeholder: 'Select mode',
              defaultValue: DeployMode.FIXED.toString(),
            },
          ]}
          renderActions={selected => (
            <DeployButton
              color={'area'}
              onClick={() => {
                addClusterMode({
                  mode: Number(selected.mode),
                  cluster_id: selected.cluster_id,
                  service_id: service_id ?? '',
                });
                setModalType(false);
              }}
            >
              Deploy
            </DeployButton>
          )}
        />
      )}
      {modalType === 'server' && selectedCluster && (
        <ModalView
          onChange={setModalType}
          title={'Add server rule'}
          content={
            [
              {
                type: 'select',
                label: { id: 'server_id', label: 'Choose server id' },
                options: selectedCluster.servers.map(s => ({
                  id: s.id,
                  value: s.id,
                })),
                placeholder: 'Select server id',
              },
              {
                type: 'input',
                label: { id: 'cpu', label: 'CPU' },
                defaultValue: serverInfo.cpu ?? 0,
                isNumber: true,
              },
              {
                type: 'input',
                label: { id: 'ram', label: 'RAM' },
                defaultValue: serverInfo.ram ?? 0,
                isNumber: true,
              },
              {
                type: 'input',
                label: { id: 'disk', label: 'DISK' },
                defaultValue: serverInfo.disk ?? 0,
                isNumber: true,
              },
              {
                type: 'input',
                label: { id: 'replicas', label: 'Input replicas' },
                placeholder: 'Input replicas...',
                isNumber: true,
              },
            ] as const
          }
          onSelect={(_key, value) => {
            const server = selectedCluster.servers.find(s => s.id === value);
            if (!server) return;
            setServerInfo({
              cpu: server.cpu.toString(),
              ram: server.ram.toString(),
              disk: server.disk.toString(),
            });
          }}
          renderActions={inputModal => (
            <DeployButton
              color={'area'}
              onClick={() => {
                const obj = convertTypes(
                  inputModal,
                  ['cpu', 'ram', 'disk', 'replicas'],
                  Number,
                );
                addServerRule({
                  service_id: service_id,
                  cluster_id: selectedCluster?.id,
                  fixed_rule: obj,
                });
                setModalType(false);
              }}
            >
              Add the rule
            </DeployButton>
          )}
        />
      )}
    </>
  );
};
