import { FC } from 'react';

import { Search } from '@components/Search';
import { Button } from '@components/Button';
import { Checkbox } from '@components/Checkbox';

import { useStaff } from './useStaff';
import { Modal, Table } from './components';

const FIRED_CKBX_ID = 'is_fired';

export const Staff: FC = () => {
  const {
    onChangeSearch,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    members,
    isFiredChecked,
    onCheckboxClick,
    isModalOpen,
    setIsModalOpen,
    onModalOpen,
  } = useStaff();

  return (
    <>
      <Modal isOpen={isModalOpen} onIsOpenChange={setIsModalOpen} />
      <section className="p-10 items-center">
        <div className="mb-3 flex gap-4">
          <Search
            onChange={onChangeSearch}
            config={{
              placeholder: 'Filter members',
              delay: 1000,
            }}
          />
          <div className="flex items-center">
            <Checkbox
              id={FIRED_CKBX_ID}
              checked={isFiredChecked}
              onCheckedChange={onCheckboxClick}
            />
            <label
              htmlFor={FIRED_CKBX_ID}
              className="ml-2 text-sm font-medium text-white cursor-pointer"
            >
              Fired
            </label>
          </div>
        </div>

        <div className="flex gap-4 mb-5">
          <Button onClick={onModalOpen}>Invite member</Button>
          <a href="./invitations">
            <Button variant="secondary">Invitations list</Button>
          </a>
        </div>
        <Table
          isLoading={isFetching}
          isLoadingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
          members={members}
        />
      </section>
    </>
  );
};
