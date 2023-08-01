import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../errors/unauthorized';
import { CustomAPIError } from '../errors/customApi';

const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthorizedError('Unauthorized');
  }
  const token = authHeader.split(' ')[1];
  if (!process.env.JWT_SECRET) {
    throw new CustomAPIError('Server is unable to authenticate requests');
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (typeof payload === 'string') {
      throw new UnauthorizedError('Unauthorized');
    }
    req.headers['userId'] = payload.userId;
    next();
  } catch (error) {
    throw new UnauthorizedError('Unauthorized');
  }
};

export default authenticateUser;
