import express from 'express';
import { ensureLoggedIn } from 'connect-ensure-login';

import userController from '../controllers/user/index.js';

const authRouter = express.Router();

authRouter.get('/login', userController.getLoginInfo);
authRouter.post('/login/password', userController.loginWithPassword);
authRouter.post('/logout', userController.logout);
authRouter.post('/signup', userController.signup);
authRouter.patch(
  '/updateuser',
  ensureLoggedIn('/auth/login'),
  userController.updateUserInfo,
);
authRouter.get(
  '/users',
  ensureLoggedIn('/auth/login'),
  userController.getAllUsers,
);

export default authRouter;
