import { useState } from 'react';

import { ClustersResponse } from '../../api/getDeploy.ts';
import { Server as ServerComp } from './Server.tsx';
import { Instance } from './Instance.tsx';
import { Cluster as ClusterComp } from './Cluster.tsx';
import { ClusterType, Status } from '../../model/cluster.types.ts';
import { Wrapper } from '../Common/Wrapper.tsx';
import { DataCenter } from '../DataCenters/DataCenters.tsx';
import { DcButton } from '../Common/DCButton.tsx';
import { DcModal } from '../DataCenters/DcModal.tsx';
import {
  getEmptiesBy,
  isInstance,
  isServer,
} from '@scenes/components/Deploy/utils/checkers.ts';
import { ModalView } from '@scenes/components/Deploy/components/Common/ModalView.tsx';
import { DeployButton } from '@scenes/components/Deploy/components/Common/DeployButton.tsx';
import {
  ContentIds,
  getAddServerToClusterContent,
} from '@scenes/components/Deploy/model/modalsContent.ts';
import { useMutation } from '@tanstack/react-query';
import { addServerToCluster } from '@scenes/components/Deploy/api/getDataCenter.ts';
import { queryClient } from '@api/constants.ts';
import { omit, pick } from 'lodash';
import { ServerType } from '@scenes/components/Deploy/model/dataCenter.types.ts';
import { convertTypes } from '@scenes/components/Deploy/utils/converters.ts';
import { ModalWarning } from '@scenes/components/Deploy/components/DataCenters/ModalWarning.tsx';
import { useDataCenter } from '@scenes/components/Deploy/lib/useDataCenter.ts';

export const Clusters = ({
  clusters,
  view = 'deploy',
}: {
  clusters: ClustersResponse;
  view?: 'deploy' | 'dataCenter';
}) => {
  const [modalType, setModalType] = useState<'cluster' | 'server' | boolean>(
    false,
  );

  const transferClusters =
    clusters.type === ClusterType.REGIONS || view === 'dataCenter'
      ? clusters.clusters
      : clusters.clusters[0].servers;

  const [modalServerErrors, setModalServerErrors] = useState<
    ContentIds<typeof getAddServerToClusterContent>[] | null
  >(null);

  const { mutate: mutateAddServerToCluster } = useMutation({
    mutationFn: addServerToCluster,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['clusters'] });
    },
  });

  const {
    nodeIds,
    handleAddServerToDataCenter,
    modalServerContent,
    selectedCluster,
    handleSelectServer,
    modalWarning,
    setModalWarning,
  } = useDataCenter({ clusters, setModalType });

  return (
    <Wrapper>
      {view === 'dataCenter' && clusters.type === ClusterType.REGIONS && (
        <DcButton onClick={() => setModalType(false)}>Add cluster</DcButton>
      )}
      {transferClusters?.map(cluster => (
        <ClusterComp
          key={cluster.id}
          servers={'servers' in cluster ? cluster.servers : cluster.instances}
          name={
            clusters.type === ClusterType.REGIONS
              ? [cluster.name, cluster.region, cluster.provider].join(', ')
              : [
                  cluster.name,
                  cluster.region,
                  cluster.availability_zone,
                  `${'cpu' in cluster ? cluster.cpu : ''} CPU`,
                  `${'ram' in cluster ? cluster.ram : ''} RAM`,
                  `${'disk' in cluster ? cluster.disk : ''} DISK`,
                ].join(' ')
          }
          clusterType={clusters.type}
          AddView={
            view === 'dataCenter' && (
              <DataCenter
                type={'add'}
                onAdd={() => handleAddServerToDataCenter(cluster)}
              />
            )
          }
          renderServer={server =>
            view === 'deploy' ? (
              <ServerComp
                key={server.id}
                name={
                  isServer(server)
                    ? server.name
                    : isInstance(server)
                      ? server.service.name
                      : ''
                }
                id={server.id ?? ''}
                status={
                  isServer(server) || isInstance(server)
                    ? server.status
                    : Status.UNKNOWN
                }
                instances={'instances' in server ? server.instances : []}
                cpu={server.cpu}
                ram={server.ram}
                disk={'disk' in server ? server.disk : server.memory}
                clusterType={clusters?.type}
                renderInstance={instance => (
                  <Instance key={instance.id} {...instance} />
                )}
              />
            ) : (
              <DataCenter
                serverType={'type' in server ? server.type : 0}
                name={
                  'region' in server
                    ? [
                        server.region,
                        `${server.cpu} CPU`,
                        `${server.ram} RAM`,
                      ].join(' ')
                    : ''
                }
              />
            )
          }
        />
      ))}
      {modalType === 'cluster' && <DcModal onOpenChange={setModalType} />}
      {modalType === 'server' && selectedCluster && modalServerContent && (
        <ModalView
          onChange={setModalType}
          title={'Add server'}
          invalidFields={modalServerErrors}
          content={modalServerContent}
          onSelect={(key, value, inputModal) =>
            handleSelectServer(key, value, inputModal, selectedCluster?.id)
          }
          renderActions={inputModal => (
            <DeployButton
              color={'area'}
              onClick={() => {
                const errors = getEmptiesBy(inputModal, [
                  'region',
                  'name',
                  'ip',
                  'cpu',
                  'ram',
                  'disk',
                  'url',
                  'token',
                ]);
                if (errors) {
                  setModalServerErrors(errors);
                  return;
                }

                const convertedInput = convertTypes(
                  inputModal,
                  ['cpu', 'ram', 'disk'],
                  Number,
                );
                const mainObj = omit(
                  convertedInput,
                  'url',
                  'token',
                  'is_manager',
                  'node_id',
                );
                const docker_api = pick(convertedInput, 'token', 'url');
                const { type } = pick(convertedInput, 'type');

                mutateAddServerToCluster({
                  ...mainObj,
                  type: Number(type) as ServerType,
                  docker_engine: {
                    docker_api,
                    is_manager:
                      nodeIds === null
                        ? true
                        : convertedInput.is_manager === 'manager',
                    node_id: convertedInput?.node_id ?? null,
                  },
                });
                setModalServerErrors(null);
                setModalType(false);
              }}
            >
              Add
            </DeployButton>
          )}
        />
      )}
      {modalWarning.isOpen && (
        <ModalWarning
          title={'Input this command in a new node'}
          text={modalWarning.text}
          onChange={o =>
            setModalWarning(prevState => ({ ...prevState, isOpen: o }))
          }
          Action={
            <DeployButton
              color={'area'}
              onClick={() => {
                setModalWarning(prevState => ({ ...prevState, isOpen: false }));
                setModalType(false);
                setModalServerErrors(null);
              }}
            >
              OK
            </DeployButton>
          }
        />
      )}
    </Wrapper>
  );
};
