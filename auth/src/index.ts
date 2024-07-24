import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app";
dotenv.config({ path: "../infra/k8s/.env" })

const authPort = 4000;
const jwtSecret = process.env.JWT_SECRET;
const mongoDbUrl = process.env.MONGO_DB_URL_WITH_DBNAME;

const start = async () => {
  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined!!");
  }
  // connect to  mongodb using mongoose
  await mongoose.connect(mongoDbUrl!)
    .then((connRes) => {
      console.log('Connection with Mongodb implemented successfully!')
    })
    .catch((err) => {
      console.log('Connection with Mongodb failed!')
    })

  app.listen(authPort, () => {
    console.log(`AUTH SERVICE is listening on port ${authPort}`)
  });
};
start();
