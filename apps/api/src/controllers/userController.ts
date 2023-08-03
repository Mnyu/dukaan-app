import { Request, Response } from 'express';
import { User } from '../models/User';
import { Product } from '../models/Product';
import { StatusCodes } from 'http-status-codes';
import { UnauthorizedError } from '../errors/unauthorized';

export const me = async (req: Request, res: Response) => {
  const userId = req.headers.userId;
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new UnauthorizedError('User does not exist');
  }
  res.status(StatusCodes.OK).json({
    name: user.firstName + ' ' + user.lastName,
    email: user.email,
    role: user.role,
  });
};

export const getProductsForUsers = async (req: Request, res: Response) => {
  const products = await Product.find({ inStock: true });
  res.status(StatusCodes.OK).json({ products });
};
