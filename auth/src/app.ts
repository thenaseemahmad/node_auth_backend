import express from "express";
import 'express-async-errors'
import cookieSession from "cookie-session";
import bodyParser from "body-parser";
import { currentUserRouter } from "./routes/currentuser";
import { signupRouter } from "./routes/signup";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import morgan from "morgan";
import { errorHandler } from "./middlewares/errorHandler";
import { NotFoundError } from "./errors/notFoundError";
const app = express();
//because we are asking to only respons https so 
//we need to ask express to trust proxy server (ingressIngenx in our case)
app.set("trust proxy", true);
app.use(bodyParser.json());
//lets setup cookie so that auth service can send cookie in its response to client
app.use(cookieSession({
  //desable encrytion on
  signed: false,
  //only can be used if user is asking over https not http
  secure: process.env.NODE_ENV !== 'test'
}));

app.use(morgan('combined'));
app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);

//this path is meant to just throw error in predefined format if there is an attempt to access a wrong path
app.all('*', async (req, res, next) => {
  throw new NotFoundError('Path not found');
})

//This middleware will catch the error thrown by any router
app.use(errorHandler);

export default app
