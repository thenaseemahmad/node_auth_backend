import { CustomError } from "./customError";

export class BadRequestError extends CustomError{
  reason:string;
  statusCode = 400;
  constructor(errorReason:string){
    super(errorReason)
    this.reason = errorReason;
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
  
  serializeError(){
    return [{message:this.reason}]
  }
}