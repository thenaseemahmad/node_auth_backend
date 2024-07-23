import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({ path: '../../../infra/k8s/.env' });

//lets define a new interface to satisfy typescript
interface UserPayload {
  id: string;
  email: string;
}

//because we dont have currentUser property in Request type script library
//so we have to add one manually
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
  //does req.session have a seesion cookie with jwt field
  if (!req.session?.jwt) {
    return next();
  }
  //time to check/verify the jwt ingested by signin/signup
  try {
    //jwt.verify will throw an error if supplied jwt is invalid or tempered in any form
    const payload = jwt.verify(req.session.jwt, process.env.JWT_SECRET!) as UserPayload;
    req.currentUser = payload;
  }
  catch (err) { }
  next();
};
