import { CustomError } from "./customError";

export class NotFoundError extends CustomError{
  statusCode = 404;
  constructor(message:string){
    super(message);

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
  serializeError(): { message: string; field?: string; }[] {
    return [{message:"Path not found", field:'path error'}]
  }
}