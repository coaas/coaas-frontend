import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { cloneDeep } from 'lodash';

import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { queryClient } from '@api/constants.ts';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
} from '@components/Modal';
import { Label } from '@scenes/components/Staff/components/Modal/components';

import { WrapperModal } from '../Common/WrapperModal.tsx';
import { clusterFields, clusterKeys } from './static.ts';
import { addProjectDeployCluster } from '../../api/getDataCenter.ts';
import { clusterOptions } from '../../api/getDeploy.ts';

export const DcModal = ({
  onOpenChange,
}: {
  onOpenChange: (o: boolean) => void;
}) => {
  const [options, setOptions] = useState(cloneDeep(clusterFields));
  const [invalidFields, setInvalidFields] = useState<typeof clusterKeys>([]);

  const convertOptions = () =>
    clusterKeys.reduce(
      (acc, val) => {
        acc[val] = options[val].value ? options[val].value : null;
        return acc;
      },
      {} as Parameters<typeof addProjectDeployCluster>[number],
    );

  const resetOptions = () =>
    setOptions(options => {
      clusterKeys.forEach(key => {
        options[key].value = '';
      });
      return { ...options };
    });

  const validateOptions = () =>
    clusterKeys.flatMap(c =>
      'isRequired' in options[c] && options[c].isRequired && !options[c].value
        ? c
        : [],
    );

  const { mutate: addProject } = useMutation({
    mutationFn: addProjectDeployCluster,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [clusterOptions.queryKey] });
    },
  });

  return (
    <Modal open onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Create a new cluster</ModalTitle>
        </ModalHeader>
        <WrapperModal>
          {clusterKeys.map(clusterKey => (
            <div key={clusterKey}>
              <Label
                id={`service-${clusterKey}`}
                label={`${clusterKey[0].toUpperCase()}${clusterKey.slice(1).split('_').join(' ')}`}
              />
              <Input
                value={options[clusterKey].value}
                placeholder={`Input ${clusterKey.split('_').join(' ')}...`}
                invalid={invalidFields.includes(clusterKey)}
                onChange={({ target: { value } }) =>
                  setOptions(ops => {
                    ops[clusterKey].value = value;
                    return { ...ops };
                  })
                }
              />
            </div>
          ))}
          <div className="flex justify-between">
            <Button
              variant={'outline'}
              onClick={() => {
                onOpenChange(false);
                resetOptions();
              }}
            >
              Close
            </Button>
            <Button
              variant={'outline'}
              onClick={() => {
                const invalid = validateOptions();
                if (invalid.length) {
                  setInvalidFields(invalid);
                  return;
                }

                addProject(convertOptions());
                resetOptions();
                onOpenChange(false);
                setInvalidFields([]);
              }}
            >
              Add the cluster
            </Button>
          </div>
        </WrapperModal>
      </ModalContent>
    </Modal>
  );
};
