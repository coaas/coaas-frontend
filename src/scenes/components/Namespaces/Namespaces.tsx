import { FC } from 'react';

import { useNamespacesMutation } from './useNamespacesMutation';

// В дальнейшем, естественно запросы изменятся
// Оставил пока для примера

const getStatusString = <TError,>(
  isPending: boolean,
  error: TError,
  status?: string,
) => {
  if (isPending) return 'Loading...';
  if (error) return 'Error';

  return status || 'None';
};

export const Namespaces: FC = () => {
  const { isPending, data, error, mutate } = useNamespacesMutation();

  const { status } = data || {};

  const onButtonClick = () => mutate();

  return (
    <>
      <p>{`API Health: ${getStatusString(isPending, error, status)}`}</p>
      <button onClick={onButtonClick} disabled={isPending}>
        Check API Health
      </button>
    </>
  );
};
