import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Product } from '../models/Product';
import { NotFoundError } from '../errors/notFound';
import { BadRequestError } from '../errors/badRequest';

export const getProducts = async (req: Request, res: Response) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ products });
};

export const createProduct = async (req: Request, res: Response) => {
  const userId = req.headers.userId;
  const productPayload = { ...req.body, seller: userId };
  const product = await Product.create(productPayload);
  res.status(StatusCodes.CREATED).json({ product });
};

export const getProduct = async (req: Request, res: Response) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId });
  if (!product) {
    throw new NotFoundError(`No product exists with id: ${productId}`);
  }
  res.status(StatusCodes.OK).json({ product });
};

export const updateProduct = async (req: Request, res: Response) => {
  const userId = req.headers.userId;
  const { id: productId } = req.params;
  const { name, description, price } = req.body;
  if (name === '' || description === '') {
    throw new BadRequestError(`Name or Description cannot be empty`);
  }
  if (price != undefined && price === 0) {
    throw new BadRequestError(`Price cannot be 0`);
  }
  const product = await Product.findOneAndUpdate(
    { _id: productId, seller: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!product) {
    throw new NotFoundError(`No product exists with id: ${productId}`);
  }
  res.status(StatusCodes.OK).json({ product });
};

export const deleteProduct = async (req: Request, res: Response) => {
  const userId = req.headers.userId;
  const { id: productId } = req.params;
  const product = await Product.findOneAndRemove({
    _id: productId,
    seller: userId,
  });
  if (!product) {
    throw new NotFoundError(`No product exists with id: ${productId}`);
  }
  res.status(StatusCodes.OK).send();
};
