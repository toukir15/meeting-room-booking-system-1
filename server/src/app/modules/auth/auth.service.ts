/* eslint-disable @typescript-eslint/no-unused-vars */
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

  // Check if the user exists
  if (!isUserExist) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User does not exist');
  }

  // Compare password
  const loginPassword = payload.password as string;
  const hashPassword = isUserExist.password;
  // eslint-disable-next-line no-unused-vars
  const { password, ...userWithoutPassword } = isUserExist; // Destructure to exclude password

  const jwtPayload = {
    id: isUserExist._id.toHexString(),
    email: isUserExist.email,
    role: isUserExist.role,
    name: isUserExist.name,
    phone: isUserExist.phone,
  };

  const comparePassword = bcrypt.compareSync(loginPassword, hashPassword);
  if (!comparePassword) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'You provided a wrong password',
    );
  }

  // Generate JWT token
  const token = jwt.sign(jwtPayload, config.secret_key as string);
  return { token, user: userWithoutPassword };
};

export const AuthServices = {
  loginUser,
};
