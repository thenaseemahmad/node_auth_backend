import { CustomError } from "./customError";

export class DatabaseConnectionError extends CustomError{
  reason:string;
  statusCode = 500;
  constructor(errorReason:string){
    super(errorReason)
    this.reason = errorReason;
    Object.setPrototypeOf(this,DatabaseConnectionError.prototype);
  }
  
  serializeError(){
    return [{message:this.reason}]
  }
}