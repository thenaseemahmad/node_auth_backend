import app from "../../app";
import request from 'supertest';
import authAndGenerateCookie, { email, password } from "../../test/authAndGenerateCookie";

it('Get 400 if user wants to signin but is not registered', async () => {
  request(app)
    .post('/api/users/signin')
    .send({
      email: 'Naseem.ahmad@bulla.com',
      password: 'BhullaKaKhulla@143'
    })
    .expect(400);
});

it('Get 200 if a registered user wants to signin', async () => {
  //register the user
  const cookie = await authAndGenerateCookie();

  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: email,
      password: password
    })
    .expect(200);
  expect(response.get('Set-Cookie')).toBeDefined();
})