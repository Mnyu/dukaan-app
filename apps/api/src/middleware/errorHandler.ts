import { Request, Response, NextFunction } from 'express';
import { NotFoundError } from '../errors/notFound';
import { BadRequestError } from '../errors/badRequest';
import { UnauthorizedError } from '../errors/unauthorized';
import { StatusCodes } from 'http-status-codes';

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('*******************************');

  console.error(err);
  let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  if (
    err instanceof NotFoundError ||
    err instanceof BadRequestError ||
    err instanceof UnauthorizedError
  ) {
    statusCode = err.statusCode;
  }
  return res.status(statusCode).json({ msg: err.message });
};

export default errorHandler;
