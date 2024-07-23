import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { currentUser } from '../middlewares/verifyCurrentUser';
import { fullfillAuthCriteria } from '../middlewares/accessManager';

dotenv.config({ path: '../../../infra/k8s/.env' });
const router = express.Router();

router.get('/api/users/currentuser', currentUser, (req, res) => {
  //<IMPORTANT NOTICE: ALL OF BELOW CODE HAVE BEEN MOVED TO verifyCurrentUser MIDDLEWARE
  //BECCAUSE OF REUSABLE PURPOSE
  // //does req.session have a seesion cookie with jwt field
  // if (!req.session?.jwt) {
  //   //return null user
  //   return res.send({ currentUser: null });
  // }
  // //time to check/verify the jwt ingested by signin/signup
  // try {
  //   //jwt.verify will throw an error if supplied jwt is invalid or tempered in any form
  //   const payload = jwt.verify(req.session?.jwt, process.env.JWT_SECRET!);
  //   res.send({ currentUser: payload });
  // } catch (err) {
  //   res.send({ currentUSer: null });
  // }
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
