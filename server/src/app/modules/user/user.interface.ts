import { USER_ROLE } from './user.const';

export type TUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: 'user' | 'admin';
};

export type TUserRole = keyof typeof USER_ROLE;
