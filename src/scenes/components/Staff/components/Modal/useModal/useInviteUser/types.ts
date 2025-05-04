export type UseInviteUserParams = {
  onSuccess: () => void;
};

export type InviteFormSubmit = {
  expires_at: Timestamp;
  // ожидается либо username, либо email
  username?: string;
  email?: string;
};
