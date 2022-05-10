import instance from '../index';
import { CreateUserDto, LoginDto, ResponseUser, User } from './types';

export const UserApi = {
  async register(dto: CreateUserDto) {
    const { data } = await instance.post<CreateUserDto, { data: ResponseUser }>(
      '/api/auth/local/register',
      dto
    );

    return data;
  },
  async login(dto: LoginDto) {
    const { data } = await instance.post<LoginDto, { data: ResponseUser }>(
      '/api/auth/local',
      dto
    );

    return data;
  },
  async getMe(token: string) {
    const { data } = await instance.get<User>('/api/users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  },
};
