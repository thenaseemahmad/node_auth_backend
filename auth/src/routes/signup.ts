import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/requestValidationError';
import { User } from '../models/user';
import { BadRequestError } from '../errors/badRequestError';
import userJwt from '../security/generateJwt';

dotenv.config({ path: '../../../infra/k8s/.env' });
// console.log(process.env);
const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').isStrongPassword().withMessage('Enter a valid password'),
  ],
  async (req: Request, res: Response) => {
    //catching the body errors if any
    const errorsInBody = validationResult(req);
    if (!errorsInBody.isEmpty()) {
      throw new RequestValidationError(errorsInBody.array());
    }
    //Lets add this user to users collection in auth db
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      throw new BadRequestError(
        'This user already exist, try using a different email address'
      );
    }

    const user = User.build({ email: email, password: password });
    await user.save();
    //For authorization purpose we are going to use
    //JWT, se lets create JWT and bind it with response
    const userJsonWebToken = userJwt(
      user.id,
      user.email,
      process.env.JWT_SECRET!
    );
    // //now is the time to store this jwt on session object
    req.session = {
      jwt: userJsonWebToken,
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
