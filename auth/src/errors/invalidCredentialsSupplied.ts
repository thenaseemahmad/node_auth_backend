import { CustomError } from './customError';

export class InvalidCredentialsError extends CustomError {
  statusCode = 404;
  message: string;
  constructor(message: string) {
    super(message);
    this.message = message;
    Object.setPrototypeOf(this, InvalidCredentialsError.prototype);
  }

  serializeError(): { message: string; field?: string }[] {
    return [{ message: this.message }];
  }
}
