import { ValidationError } from "express-validator";
import { CustomError } from "./customError";

export class RequestValidationError extends CustomError{
  errors: ValidationError[];
  statusCode = 400;
  constructor(errors:ValidationError[]){
    super('Bad request error: not a valid email or password')
    this.errors = errors;
    //Only because we are inheriting a build in class
    Object.setPrototypeOf(this,RequestValidationError.prototype);
  }

  serializeError(){
    const errObj = this.errors.map((error)=>{
      if(error.type==="field"){
        return {message:error.msg, field:error.path}
      }
      return {message:error.msg};      
    })
    return errObj
  }
}