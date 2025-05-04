import { FC } from 'react';
import { X } from 'lucide-react';

import {
  Modal as ModalComponent,
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

import { ModalProps } from './types';
import { useModal } from './useModal';
import { NicknameInput, Label, InviteItem } from './components';
import { INPUT_IDS, SELECT_ITEMS } from './constants';

export const Modal: FC<ModalProps> = ({ isOpen, onIsOpenChange, refetch }) => {
  const {
    onOpenChange,
    pickedInvite,
    formState: { searchValue, expirationDate },
    isUserFetchingPending,
    inviteItems,
    isSubmitDisabled,
    onSearchChange,
    onInviteItemClick,
    onResetPickedInvite,
    onExpirationDateChange,
    onInviteButtonClick,
  } = useModal({ onIsOpenChange, refetch });

  return (
    <ModalComponent open={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Invite member</ModalTitle>
        </ModalHeader>
        <form>
          <div className="flex flex-col gap-5">
            <div>
              <Label label="Nickname or email" id={INPUT_IDS.searchValue} />
              {/* если пользователь выбран, показываем его, а иначе - поисковую стркоу */}
              {pickedInvite ? (
                <div className="h-[42px] rounded-sm py-1.5 flex items-center px-2 outline-none bg-stroke-gray-dark justify-between">
                  <div>
                    <InviteItem item={pickedInvite} />
                  </div>
                  <X
                    color="#B6B6B6"
                    className="h-4 w-4 ml-2 cursor-pointer"
                    onClick={onResetPickedInvite}
                  />
                </div>
              ) : (
                <NicknameInput
                  searchValue={searchValue}
                  isUserFetchingPending={isUserFetchingPending}
                  inviteItems={inviteItems}
                  onInviteItemClick={onInviteItemClick}
                  onSearchChange={onSearchChange}
                />
              )}
            </div>
            <div>
              <Label label="Expiration date" id={INPUT_IDS.expirationDate} />
              <Select
                onValueChange={onExpirationDateChange}
                defaultValue={expirationDate}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select the expiration date" />
                </SelectTrigger>
                <SelectContent>
                  {SELECT_ITEMS.map(({ title, value }) => (
                    <SelectItem key={title} value={value}>
                      {title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button
            className="mt-5 w-full"
            type="button"
            onClick={onInviteButtonClick}
            disabled={isSubmitDisabled}
          >
            Invite
          </Button>
        </form>
      </ModalContent>
    </ModalComponent>
  );
};
