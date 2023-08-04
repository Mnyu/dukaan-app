import { Request, Response } from 'express';
import { User } from '../models/User';
import { StatusCodes } from 'http-status-codes';
import { CustomAPIError } from '../errors/customApi';
import { BadRequestError } from '../errors/badRequest';
import { UnauthorizedError } from '../errors/unauthorized';
import {
  registerUserProps,
  loginUserProps,
  RegisterLoginUserResponse,
} from 'common';

export const register = async (req: Request, res: Response) => {
  const parsedInput = registerUserProps.safeParse(req.body);
  if (!parsedInput.success) {
    console.log(parsedInput.error);
    throw new BadRequestError('Input validation failed');
  }
  const user = await User.create({ ...parsedInput.data });
  if (!process.env.JWT_SECRET || !process.env.JWT_LIFETIME) {
    throw new CustomAPIError('Unable to register.');
  }
  const token = user.createJWT(
    process.env.JWT_SECRET,
    process.env.JWT_LIFETIME
  );
  const response: RegisterLoginUserResponse = {
    token,
    email: user.email,
    role: user.role,
    name: user.firstName + ' ' + user.lastName,
  };
  res.status(StatusCodes.CREATED).json(response);
};

export const login = async (req: Request, res: Response) => {
  const parsedInput = loginUserProps.safeParse(req.body);
  if (!parsedInput.success) {
    console.log(parsedInput.error);
    throw new BadRequestError('Input validation failed');
  }
  const { email, password } = parsedInput.data;
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthorizedError('Invalid credentials');
  }
  const isPasswordCorrect: boolean = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthorizedError('Invalid credentials');
  }
  if (!process.env.JWT_SECRET || !process.env.JWT_LIFETIME) {
    throw new CustomAPIError('Unable to login.');
  }
  const token = user.createJWT(
    process.env.JWT_SECRET,
    process.env.JWT_LIFETIME
  );
  const response: RegisterLoginUserResponse = {
    token,
    email: user.email,
    role: user.role,
    name: user.firstName + ' ' + user.lastName,
  };
  res.status(StatusCodes.OK).json(response);
};
