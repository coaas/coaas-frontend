import { OrchEngine } from '@scenes/components/Deploy/model/cluster.types.ts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/Select/Select.tsx';
import { DeployButton } from '@scenes/components/Deploy/components/Common/DeployButton.tsx';
import { useState } from 'react';
import {
  addProjectDeploy,
  AddProjectDeployRequest,
  clusterOptions,
} from '@scenes/components/Deploy/api/getDeploy.ts';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@api/constants.ts';
import { ClusterType } from '@scenes/components/Deploy/model/types.ts';

export const NotDeployed = ({ resetDeployState }: { resetDeployState?: () => void }) => {
  const [addDeployInput, setAddDeployInput] =
    useState<Partial<AddProjectDeployRequest> | null>(null);

  const { mutate: mutateAddProject } = useMutation({
    mutationFn: addProjectDeploy,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: clusterOptions.queryKey,
      });
      resetDeployState?.();
    },
  });

  return (
    <div>
      <p className="text-xl text-center mt-8">
        You have not deployed project yet.
      </p>
      <form
        onSubmit={e => e.preventDefault()}
        className="mx-40 flex flex-col gap-4 mt-8"
      >
        {(
          [
            {
              id: 'type',
              placeholder: 'Select type of the deploy...',
              options: [
                { value: ClusterType.REGIONS, label: 'Regions' },
                { value: ClusterType.SERVERS, label: 'Servers' },
              ],
            },
            {
              id: 'orchestration_engine',
              placeholder: 'Select type of orchestration...',
              options: [
                { value: OrchEngine.DOCKER, label: 'Docker' },
                { value: OrchEngine.KUBERNETES, label: 'Kubernetes' },
              ],
            },
          ] as const
        ).map(({ id, options, placeholder }) => (
          <Select
            onValueChange={value =>
              setAddDeployInput(prevState =>
                prevState
                  ? {
                      ...prevState,
                      [id]: Number(value),
                    }
                  : {
                      [id]: Number(value),
                    },
              )
            }
            key={id}
          >
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map(({ value, label }) => (
                <SelectItem key={`${id}-${value}`} value={String(value)}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ))}
        <DeployButton
          color={'area'}
          onClick={() => {
            if (
              !addDeployInput ||
              addDeployInput.type === undefined ||
              addDeployInput.orchestration_engine === undefined
            )
              return;
            mutateAddProject(addDeployInput as AddProjectDeployRequest);
          }}
        >
          Deploy
        </DeployButton>
      </form>
    </div>
  );
};
