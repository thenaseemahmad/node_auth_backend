import request from "supertest";
import app from "../app";

export const email = 'naseem.ahmad@bulla.com';
export const password = 'BullaKaKhulla@143';
export default async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: email,
      password: password
    })
    .expect(201);
  return response.get('Set-Cookie');
}