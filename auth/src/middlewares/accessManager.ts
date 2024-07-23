import { NextFunction, Request, Response } from "express";
import { NotAuthorizedError } from "../errors/notAuthorizedError";

export const fullfillAuthCriteria = (req: Request, res: Response, next: NextFunction) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError('Not authorized');
  }
  next();
}