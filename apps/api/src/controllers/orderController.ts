import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Order } from '../models/Order';
import { NotFoundError } from '../errors/notFound';
import { createOrderProps } from 'common';
import { BadRequestError } from '../errors/badRequest';

export const createOrder = async (req: Request, res: Response) => {
  const parsedInput = createOrderProps.safeParse(req.body);
  if (!parsedInput.success) {
    console.log(parsedInput.error);
    throw new BadRequestError('Input validation failed');
  }
  const userId = req.headers.userId;
  const orderPayload = { ...parsedInput.data, user: userId };
  const order = await Order.create(orderPayload);
  res.status(StatusCodes.CREATED).json({ order });
};

export const getOrders = async (req: Request, res: Response) => {
  const userId = req.headers.userId;
  const orders = await Order.find({ user: userId });
  res.status(StatusCodes.OK).json({ orders });
};

export const getOrder = async (req: Request, res: Response) => {
  const userId = req.headers.userId;
  const { id: orderId } = req.params;
  const order = await Order.findOne({ _id: orderId, user: userId });
  if (!order) {
    throw new NotFoundError(`No product exists with id: ${orderId}`);
  }
  res.status(StatusCodes.OK).json({ order });
};
