import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';
// dotenv.config({ path: '../../../infra/k8s/.env' });

export default function userJwt(
  userId: string,
  userEmail: string,
  secret: string
): string {
  const webToken = jwt.sign(
    {
      id: userId,
      email: userEmail,
    },
    secret
  );
  return webToken;
}
