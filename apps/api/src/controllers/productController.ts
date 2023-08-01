import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const test = async (req: Request, res: Response) => {
  console.log('TESTING!!!!!!');
  return res.send(StatusCodes.OK);
};
