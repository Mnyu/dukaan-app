import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Product } from '../models/Product';
import { NotFoundError } from '../errors/notFound';
import { BadRequestError } from '../errors/badRequest';
import path from 'path';
import { UploadedFile } from 'express-fileupload';
import { createProductProps, updateProductProps } from 'common';

const maxSize = 1024 * 1024;

export const uploadProductImage = async (req: Request, res: Response) => {
  if (!req.files) {
    throw new BadRequestError('No file uploaded');
  }
  const productImage = req.files.image as UploadedFile;

  if (!productImage.mimetype.startsWith('image')) {
    throw new BadRequestError('Please upload an image');
  }
  if (productImage.size > maxSize) {
    throw new BadRequestError('Please upload image smaller than 1MB');
  }
  const imagePath = path.join(__dirname, `../public/${productImage.name}`);
  await productImage.mv(imagePath);
  res.status(StatusCodes.OK).json({ image: { src: `/${productImage.name}` } });
};

export const getProducts = async (req: Request, res: Response) => {
  const userId = req.headers.userId;
  const products = await Product.find({ seller: userId });
  res.status(StatusCodes.OK).json({ products });
};

export const createProduct = async (req: Request, res: Response) => {
  const parsedInput = createProductProps.safeParse(req.body);
  if (!parsedInput.success) {
    console.log(parsedInput.error);
    throw new BadRequestError('Input validation failed');
  }
  const userId = req.headers.userId;
  const productPayload = { ...parsedInput.data, seller: userId };
  const product = await Product.create(productPayload);
  res.status(StatusCodes.CREATED).json({ product });
};

export const getProduct = async (req: Request, res: Response) => {
  const userId = req.headers.userId;
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId, seller: userId });
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
