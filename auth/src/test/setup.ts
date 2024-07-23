//this file will create the test environment for the test cases we are writing

import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

//this funtion will work as a init function
let mongo: any;
beforeAll(async () => {
  process.env.JWT_SECRET = 'abcd';
  //lets init an in memory mongo server
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();
  await mongoose.connect(mongoUri);
})

//this will run before each of our test
//we need to reach mongodb and delete all the data created by earlier test case
beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
})

//after all the test cases we need to close the connection with this mongodb
afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
})