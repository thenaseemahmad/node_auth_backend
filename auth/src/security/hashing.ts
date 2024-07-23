import bcrypt from "bcrypt";

export class Hashing{
  saltingRound = 10;
  async getHash(password:string):Promise<string>{
    return await bcrypt.hash(password, this.saltingRound);
  }

  async compare(suppliedPassword:string, storedHash:string):Promise<boolean>{
    return await bcrypt.compare(suppliedPassword,storedHash)
  }
}