import { api } from '@api/constants';
import { getUserNamespacesAndProjects } from '@api/endpoints';
import { Button } from '@components/Button';
// import { keepPreviousData, useQuery } from '@tanstack/react-query';

const fetcher = () => api.post(getUserNamespacesAndProjects).json();

export const Header = () => {
  // const { isLoading, data } = useQuery({
  //   queryKey: [getUserNamespacesAndProjects],
  //   queryFn: ({ pageParam }) => fetcher(),
  //   refetchOnWindowFocus: false,
  //   placeholderData: keepPreviousData,
  // });

  return (
    <div className="p-3 w-full  border-b-stroke-gray border-b-[1.5px]">
      <Button onClick={() => fetcher().then(d => console.log(d))}>
        fetch namespaces{' '}
      </Button>
    </div>
  );
};
