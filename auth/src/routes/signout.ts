import { Router } from 'express';

const router = Router();
router.post('/api/users/signout', (req, res) => {
  //to signout a user we have to nullify the cookie in the session
  //so that user can not make any followup requests
  req.session = null;
  res.send({});
});

export { router as signoutRouter };
