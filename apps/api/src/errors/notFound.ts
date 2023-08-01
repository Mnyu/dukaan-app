import { StatusCodes } from 'http-status-codes';
import { CustomAPIError } from './customApi';

export class NotFoundError extends CustomAPIError {
  public statusCode: StatusCodes;

  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}
