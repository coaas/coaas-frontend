export type FetchUsersRequestParams = {
  query: string;
};

export type FetchUsersResponse = {
  users: { username: string }[];
};

export type UseFetchUsersParams = {
  onSuccess: (
    response: FetchUsersResponse,
    params: FetchUsersRequestParams,
  ) => void;
};
