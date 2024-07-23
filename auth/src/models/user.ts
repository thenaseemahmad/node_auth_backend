import mongoose, { Schema } from "mongoose";
import { Hashing } from "../security/hashing";

//an interface that describe the properties required to create a new user
interface userAttributes{
  email:string;
  password:string;
}

//an interface that describe the build method
interface UserModel extends mongoose.Model<UserDoc>{
  build(attributes:userAttributes):UserDoc;
}

interface UserDoc extends mongoose.Document{
  email:string;
  password: string;
}

const userSchema = new Schema({
  email:{
    type: String,
    required: true
  },
  password:{
    type:String,
    required:true
  }
},

//we dont want password, __v, and _id in output of a new user
//instead lets delete password, and __v, and change _id to just id
{
  toJSON:{
    transform(doc,ret){
      ret.id = ret._id
      delete ret._id
      delete ret.password
      delete ret.__v
    }
}});

//lets hash the password here itself
userSchema.pre('save',async function(done) {
  if(this.isModified('password')){
    const hashingObj = new Hashing();
    const hashedPass = await hashingObj.getHash(this.get('password'));
    this.set('password',hashedPass);
  }
  done();
})

userSchema.statics.build=(attributes:userAttributes)=>{
  return new User(attributes);
}
const User = mongoose.model<UserDoc, UserModel>('User',userSchema);
export {User}