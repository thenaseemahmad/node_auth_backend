import app from "../../app"
import request from "supertest";

it("User cookie cleared successfully on signout", async () => {
  //lets first signup the user
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'Naseem.ahmad@bulla.com',
      password: 'BhullaKaKhulla@143'
    })
    .expect(201);

  const response = await request(app)
    .post('/api/users/signout')
    .send({})
    .expect(200);
  // expect(response.get('Set-Cookie')).toBeUndefined();
  // console.log(response.get('Set-Cookie'));
  expect(response.get('Set-Cookie')![0]).toEqual('session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly')
})