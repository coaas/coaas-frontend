import { useMemo, useReducer, useState } from 'react';

import { useMutation, useQueries } from '@tanstack/react-query';
import { xorBy } from 'lodash';

import { Dotted } from '../../components/Common/Dotted.tsx';
import { DeployButton } from '../../components/Common/DeployButton.tsx';
import { Deploy } from '../icons';

import { queryClient } from '@api/constants.ts';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
} from '@components/Modal';
import { Button } from '@components/Button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/Select';
import { Label } from '@scenes/components/Staff/components/Modal/components';

import { ServiceType } from '../../model/service.types.ts';
import {
  deployedServicesOptions,
  DeployedServicesResponse,
  deployService,
  listServicesOptions,
  ListServicesResponse,
} from '../../api/getServiceManager.ts';
import { WrapperModal } from '../../components/Common/WrapperModal.tsx';

const Service = ({
  description,
  name,
  type,
}: {
  description: string;
  name: string;
  type: ServiceType;
}) => {
  return (
    <div className="bg-area-dark/70 border border-stroke-gray-dark px-8 py-6 flex gap-8 w-full rounded-lg items-center">
      <Deploy />
      <div className="flex flex-col">
        <div className="flex gap-2 items-center mb-1">
          <p className="text-xl font-bold">{name}</p>
          <p className="px-2 bg-stroke-blue/20 rounded-lg border-2 border-stroke-blue text-blue font-bold">
            {type}
          </p>
        </div>
        <p className="text-lg text-stroke-gray-lght">{description}</p>
      </div>
    </div>
  );
};

export const Services = () => {
  const [isDeployModal, toggleIsDeployModal] = useReducer(d => !d, false);
  const [deployValue, setDeployValue] = useState('');
  const { deployedServices, listServices, isPending, isError, isSuccess } =
    useQueries<
      [typeof deployedServicesOptions, typeof listServicesOptions],
      {
        deployedServices: DeployedServicesResponse;
        listServices: ListServicesResponse;
        isError: boolean;
        isPending: boolean;
        isSuccess: boolean;
      }
    >({
      queries: [deployedServicesOptions, listServicesOptions],
      combine: result => ({
        deployedServices: result[0].data as DeployedServicesResponse,
        listServices: result[1].data as ListServicesResponse,
        isError: result[0].isError || result[1].isError,
        isPending: result[0].isPending || result[1].isPending,
        isSuccess: result[0].isSuccess && result[1].isSuccess,
      }),
    });

  const { mutate: mutateDeployService } = useMutation({
    mutationFn: deployService,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          deployedServicesOptions.queryKey,
          listServicesOptions.queryKey,
        ],
      });
    },
  });

  const deployableServices = useMemo(() => {
    if (!isSuccess) return [];
    const services = xorBy(
      deployedServices?.services,
      listServices?.services,
      'id',
    );
    setDeployValue(services[0].id);
    return services;
  }, [deployedServices?.services, listServices?.services, isSuccess]);

  const handleDeploy = () => {
    if (!deployValue) return;
    mutateDeployService(deployValue);
    toggleIsDeployModal();
  };

  if (isPending) {
    return null;
  }

  if (isError) {
    return (
      <p className="text-xl w-full text-center">
        You have not deployed project yet.
      </p>
    );
  }

  return (
    <Dotted>
      <Modal open={isDeployModal} onOpenChange={toggleIsDeployModal}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Choose the service for deploying</ModalTitle>
          </ModalHeader>
          <WrapperModal>
            <div>
              <Label id={'Service'} label={'Choose service'} />
              <Select onValueChange={setDeployValue} defaultValue={deployValue}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose service" />
                </SelectTrigger>
                <SelectContent>
                  {deployableServices.map(({ id, name }) => (
                    <SelectItem key={id} value={id}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-between">
              {[
                { text: 'Close', onClick: toggleIsDeployModal },
                { text: 'Deploy', onClick: handleDeploy },
              ].map(({ text, onClick }) => (
                <Button key={text} variant={'outline'} onClick={onClick}>
                  {text}
                </Button>
              ))}
            </div>
          </WrapperModal>
        </ModalContent>
      </Modal>
      <DeployButton color={'blue'} isBorder onClick={toggleIsDeployModal}>
        Deploy service
      </DeployButton>
      {deployedServices?.services.map(s => <Service key={s.id} {...s} />)}
    </Dotted>
  );
};
