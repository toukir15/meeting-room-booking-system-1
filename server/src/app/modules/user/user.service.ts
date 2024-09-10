import httpStatus from 'http-status';
import { User } from './user.model';
import { AppError } from '../../errors/appError';
import config from '../../config';
import { TUser } from './user.interface';
import bcrypt from 'bcryptjs';

const createUserIntoDB = async (payload: TUser) => {
  // check user is exist or not
  const isUserExist = await User.findOne({ email: payload.email });
  if (isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User is already exist');
  }

  // make password hash
  const salt = bcrypt.genSaltSync(Number(config.bcrypt_salt_round));
  const hash = bcrypt.hashSync(payload.password, salt);
  if (!hash) {
    throw new AppError(httpStatus.CONFLICT, 'Conflict with user credantial');
  }
  payload.password = hash;
  const result = await User.create(payload);
  return result;
};

const getUserFromDB = async () => {
  const result = await User.find({ role: 'user' }).select({
    name: 1,
    email: 1,
    address: 1,
    phone: 1,
    role: 1,
  });
  return result;
};

const updateUserIntoDB = async (id: string) => {
  const result = await User.findByIdAndUpdate(
    id,
    { role: 'admin' },
    { new: true },
  );
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getUserFromDB,
  updateUserIntoDB,
};
