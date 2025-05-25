import { useState } from 'react';

import { ClustersResponse } from '../../api/getDeploy.ts';
import { Server } from './Server.tsx';
import { Instance } from './Instance.tsx';
import { Cluster } from './Cluster.tsx';
import { ClusterType, Status } from '../../model/cluster.types.ts';
import { Wrapper } from '../Common/Wrapper.tsx';
import { DataCenter } from '../DataCenters/DataCenters.tsx';
import { DcButton } from '../Common/DCButton.tsx';
import { DcModal } from '../DataCenters/DcModal.tsx';
import {
  isInstance,
  isServer,
} from '@scenes/components/Deploy/utils/checkers.ts';

export const Clusters = ({
  clusters,
  view = 'deploy',
}: {
  clusters: ClustersResponse;
  view?: 'deploy' | 'dataCenter';
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const transferClusters =
    clusters.type === ClusterType.REGIONS || view === 'dataCenter'
      ? clusters.clusters
      : clusters.clusters[0].servers;

  return (
    <Wrapper>
      {view === 'dataCenter' && clusters.type === ClusterType.SERVERS && (
        <DcButton onClick={() => setIsOpenModal(true)}>Add cluster</DcButton>
      )}
      {transferClusters?.map(cluster => (
        <Cluster
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
              <DataCenter type={'add'} onAdd={() => {}} />
            )
          }
          renderServer={server =>
            view === 'deploy' ? (
              <Server
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
      <DcModal isOpen={isOpenModal} onOpenChange={setIsOpenModal} />
    </Wrapper>
  );
};
