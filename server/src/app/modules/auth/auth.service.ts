import httpStatus from 'http-status';
import config from '../../config';
import { AppError } from '../../errors/appError';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../user/user.model';
import { TUser } from '../user/user.interface';

const loginUser = async (payload: Partial<TUser>) => {
  const isUserExist = await User.findOne({
    email: payload.email,
  }).lean();

  // check user exist or not
  if (!isUserExist) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User does not exist');
  }

  // compare password
  const loginPassword = payload.password as string;
  const hashPassword = isUserExist.password;
  delete isUserExist.password;
  const jwtPayload = {
    id: isUserExist._id.toHexString(),
    email: isUserExist.email,
    role: isUserExist.role,
  };

  const comparePassword = bcrypt.compareSync(loginPassword, hashPassword);
  if (!comparePassword) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You provide a wrong password');
  }
  // generate jwt token
  const token = jwt.sign(jwtPayload, config.secret_key as string);
  return { token, isUserExist };
};

export const AuthServices = {
  loginUser,
};
