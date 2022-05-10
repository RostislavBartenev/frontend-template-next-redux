export type LoginDto = {
  identifier: string;
  password: string;
};

export type CreateUserDto = {
  username: string;
  email: string;
  password: string;
};

export type ResponseUser = {
  jwt: string;
  user: {
    email: string;
    id: number;
    username: string;
  };
};

export type User = {
  jwt: string;
  email: string;
  id: number;
  username: string;
};
