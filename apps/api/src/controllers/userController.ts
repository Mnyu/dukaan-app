import { Request, Response } from 'express';
import { User } from '../models/User';
import { StatusCodes } from 'http-status-codes';
import { UnauthorizedError } from '../errors/unauthorized';

export const me = async (req: Request, res: Response) => {
  const userId = req.headers.userId;
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new UnauthorizedError('User does not exist');
  }
  res.status(StatusCodes.OK).json({
    email: user.email,
    role: user.role,
  });
};
