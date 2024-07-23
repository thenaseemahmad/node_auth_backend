import { CustomError } from "./customError";

export class NotAuthorizedError extends CustomError {
  statusCode: number = 401;
  errorMessage: string;
  constructor(message: string) {
    super(message);
    this.errorMessage = message
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }
  serializeError(): { message: string; field?: string; }[] {
    return [{ message: this.errorMessage }];
  }
}