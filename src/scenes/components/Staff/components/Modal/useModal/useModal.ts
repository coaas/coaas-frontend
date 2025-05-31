import { useMemo, useState } from 'react';
import debounce from 'debounce';

import { getIsEmail } from '@utils/strings';

import { useFetchUsers } from './useFetchUsers';
import {
  ExpirationDate,
  FormState,
  InviteItem,
  InviteItemType,
  UseModalParams,
} from './types';
import { useInviteUser } from './useInviteUser';

const FETCH_USER_DEBOUNCE = 1000;

export const useModal = ({ onIsOpenChange, refetch }: UseModalParams) => {
  const [formState, setFormState] = useState<FormState>({
    searchValue: '',
    expirationDate: ExpirationDate.week,
  });

  const [inviteItems, setInviteItems] = useState<InviteItem[]>([]);
  const [pickedInvite, setPickedInvite] = useState<InviteItem | null>(null);

  const mutation = useFetchUsers({
    onSuccess: ({ users }, { query }) =>
      setInviteItems(
        users.length
          ? // если найдены пользователи - показываем их
            users.map(({ username }) => ({
              title: username,
              type: InviteItemType.user,
              data: {
                username,
              },
            }))
          : getIsEmail(query)
            ? // если такие пользователи не найдены, но вбита почта, показываем приглашение на нее
              [
                {
                  title: query,
                  type: InviteItemType.mail,
                  data: {
                    email: query,
                  },
                },
              ]
            : // иначе не показываем приглашений
              [],
      ),
  });

  const onSearchValueChange = useMemo(
    () => debounce(mutation.mutate, FETCH_USER_DEBOUNCE),
    [mutation.mutate],
  );

  const onOpenChange = (newIsOpen: boolean) => {
    onIsOpenChange(newIsOpen);
    setPickedInvite(null);
    setInviteItems([]);
    setFormState({ searchValue: '', expirationDate: ExpirationDate.week });
    mutation.reset();
  };

  const onSearchChange = (newSearchValue: string) => {
    setFormState(prev => ({
      ...prev,
      searchValue: newSearchValue,
    }));
    onSearchValueChange({ query: newSearchValue });
  };
  const onExpirationDateChange = (expirationDate: ExpirationDate) =>
    setFormState(prev => ({
      ...prev,
      expirationDate,
    }));

  const onResetPickedInvite = () => setPickedInvite(null);

  const getExpirationTimestamp = (expirationDate: ExpirationDate) => {
    const date = new Date();

    switch (expirationDate) {
      case ExpirationDate.day:
        date.setDate(date.getDate() + 1);
        break;

      case ExpirationDate.week:
        date.setDate(date.getDate() + 7);
        break;

      default:
        date.setMonth(date.getMonth() + 1);
        break;
    }

    return date.toISOString();
  };

  const inviteMutate = useInviteUser({ onSuccess: () => refetch?.() });

  const onInviteButtonClick = () => {
    if (!pickedInvite) return;

    inviteMutate.mutate({
      expires_at: getExpirationTimestamp(formState.expirationDate),
      ...pickedInvite.data,
    });
    onIsOpenChange(false);
  };

  return {
    onSearchChange,
    isSubmitDisabled: !pickedInvite,
    isUserFetchingPending: onSearchValueChange.isPending || mutation.isPending,
    onOpenChange,
    inviteItems,
    pickedInvite,
    formState,
    onInviteItemClick: setPickedInvite,
    onResetPickedInvite,
    onExpirationDateChange,
    onInviteButtonClick,
  };
};
