import { Request, Response } from 'express';
import { User } from '../models/User';
import { StatusCodes } from 'http-status-codes';
import { CustomAPIError } from '../errors/customApi';
import { BadRequestError } from '../errors/badRequest';
import { UnauthorizedError } from '../errors/unauthorized';

export const register = async (req: Request, res: Response) => {
  const user = await User.create({ ...req.body });
  if (!process.env.JWT_SECRET || !process.env.JWT_LIFETIME) {
    throw new CustomAPIError('Unable to register.');
  }
  const token = user.createJWT(
    process.env.JWT_SECRET,
    process.env.JWT_LIFETIME
  );
  res.status(StatusCodes.CREATED).json({ token });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError('Please provide email and password');
  }
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
  res.status(StatusCodes.OK).json({ token });
};
