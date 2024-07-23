import app from "../../app"
import request from "supertest";

it('return 201 on successfull signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'naseem@naseem.com',
      password: 'BullaKaKhulaa@143'
    })
    .expect(201);
});

it("return 400 against invalid email and password", async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: "ajdklj",
      password: "alkjdlk"
    })
    .expect(400);
});

it("return 400 against valid email but invalid password", async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: "ajdklj@gmail.com",
      password: "alkjdlk"
    })
    .expect(400);
});

it("return 400 against invalid email but valid password", async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: "@gmail.com",
      password: "BullaKaKhulla@143"
    })
    .expect(400);
});

it("return 400 against empty email or password", async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: "",
      password: ""
    })
    .expect(400);
});

it("Duplicate email registeration not allowed", async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: "naseem.ahmad@bulla.com",
      password: "BhullaKaKhulla@143"
    })
    .expect(201);

  await request(app)
    .post('/api/users/signup')
    .send({
      email: "naseem.ahmad@bulla.com",
      password: "BhullaKaKhulla@143"
    })
    .expect(400);
});

it("Sets a cookie on successfull signup", async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: "naseem.ahmad@bulla.com",
      password: "BhullaKaKhulla@143"
    })
    .expect(201);
  expect(response.get('Set-Cookie')).toBeDefined();
});