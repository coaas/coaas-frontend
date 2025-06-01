import { useMemo, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { Clusters } from './Clusters/Clusters';
import { Services } from './Services/Services.tsx';
import { Achieve } from './Common/Achieve.tsx';
import { ClusterType, OrchEngine, Status } from '../model/cluster.types.ts';
import { clusterOptions } from '../api/getDeploy.ts';
import { DeployButton } from './Common/DeployButton.tsx';
import { Deployed } from './Deployed/Deployed.tsx';
import { DeployRules } from './Deployed/DeployRules.tsx';
import { NotDeployed } from '@scenes/components/Deploy/components/NotDeployed.tsx';

const getDeployTypes = (type: ClusterType) =>
  [
    `Cluster${type === ClusterType.REGIONS ? 's' : ''}`,
    'Services',
    type === ClusterType.REGIONS ? 'Data Centers' : 'Servers',
  ] as const;

export const Deploy = ({
  type = 'deploy',
}: {
  type?: 'deploy' | 'deployed';
}) => {
  const clusterApi = useQuery(clusterOptions);

  const deployTypes = useMemo(
    () => getDeployTypes(clusterApi.data?.type ?? ClusterType.REGIONS),
    [clusterApi],
  );

  const [selectedDeploy, setSelectedDeploy] = useState<
    ReturnType<typeof getDeployTypes>[number]
  >(deployTypes[0]);

  const deployTags = useMemo(
    () =>
      clusterApi.data
        ? [
            clusterApi.data?.type === ClusterType.REGIONS
              ? 'regions'
              : 'servers',
            clusterApi.data?.orchestration_engine === OrchEngine.DOCKER
              ? 'docker'
              : 'kubernetes',
          ]
        : [],
    [clusterApi],
  );

  if (clusterApi.isError) {
    return <NotDeployed />;
  }

  if (clusterApi.isPending) {
    return null;
  }

  const SelectedDeployComponent = {
    Clusters: <Clusters clusters={clusterApi.data} />,
    Cluster: <Clusters clusters={clusterApi.data} />,
    Services: <Services />,
    'Data Centers': <Clusters clusters={clusterApi.data} view={'dataCenter'} />,
    Servers: <Clusters clusters={clusterApi.data} view={'dataCenter'} />,
  }[selectedDeploy];

  return (
    <div className="flex flex-col mt-8 px-20 items-center pb-16">
      <div className="self-start flex justify-between items-center w-full">
        <h1 className="text-2xl font-bold">
          {type === 'deploy' ? 'Deploy' : 'Instances'}
        </h1>
        {type === 'deploy' && (
          <div className="flex gap-2">
            {deployTags.map(tag => (
              <Achieve key={tag} status={Status.UNKNOWN} size={'lg'}>
                {tag}
              </Achieve>
            ))}
          </div>
        )}
      </div>
      {type === 'deploy' && (
        <div className="w-full mt-4 border-2 border-stroke-blue p-1 rounded-sm">
          <div className="flex">
            {deployTypes.map(name => (
              <DeployButton
                key={name}
                color={selectedDeploy === name ? 'blue' : 'transparent'}
                onClick={() => setSelectedDeploy(name)}
              >
                {name}
              </DeployButton>
            ))}
          </div>
        </div>
      )}
      <div className="mt-8" />
      {type === 'deploy' ? (
        SelectedDeployComponent
      ) : (
        <>
          <Deployed clusters={clusterApi.data} />
          <DeployRules clusters={clusterApi.data} />
        </>
      )}
    </div>
  );
};
