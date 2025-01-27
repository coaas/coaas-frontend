export type User = {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
};

export type UMethod = 0 | 1 | 2 | 3;

export type GetUserDto = {
  login: string;
  method: UMethod;
};
