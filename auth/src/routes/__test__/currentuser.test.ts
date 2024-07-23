import app from "../../app"
import request from "supertest";
import authAndGenerateCookie from "../../test/authAndGenerateCookie";

it('Getting a valid current user', async () => {
  //register and get a cookie for the registered user
  const cookie = await authAndGenerateCookie();

  //lets try to get the user
  const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie!)
    .send()
    .expect(200);
  // console.log(response.body);
  expect(response.body.currentUser.email).toEqual('naseem.ahmad@bulla.com');

})