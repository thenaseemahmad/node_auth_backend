import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/requestValidationError';
import { User } from '../models/user';
import { Hashing } from '../security/hashing';
import { InvalidCredentialsError } from '../errors/invalidCredentialsSupplied';
import userJwt from '../security/generateJwt';
import dotenv from 'dotenv';

dotenv.config({ path: '../../../infra/k8s/.env' });
const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email should be valid'),
    body('password').trim().notEmpty().withMessage("Password can't be empty"),
  ],
  async (req: Request, res: Response) => {
    const errorInBody = validationResult(req);
    if (!errorInBody.isEmpty()) {
      throw new RequestValidationError(errorInBody.array());
    }
    const { email, password } = req.body;
    //check if user with this email exist? if No then thorow error
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new InvalidCredentialsError('Invalid credentials');
    }
    //if yes then check if passward matched? if No then throw error
    const hashing = new Hashing();

    const passwordMatch = await hashing.compare(
      password,
      existingUser.password
    );
    if (passwordMatch === false) {
      throw new InvalidCredentialsError('Invalid credentials');
    }
    //create a jwt
    const userJsonWebToken = userJwt(
      existingUser.id,
      existingUser.email,
      process.env.JWT_SECRET!
    );

    //ingest this jwt with this req
    req.session = { jwt: userJsonWebToken };
    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
