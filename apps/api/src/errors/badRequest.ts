import { StatusCodes } from 'http-status-codes';
import { CustomAPIError } from './customApi';

export class BadRequestError extends CustomAPIError {
  public statusCode: StatusCodes;

  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
