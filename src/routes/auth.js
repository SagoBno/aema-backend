import express from 'express';

import userController from '../controllers/user/index.js';

const authRouter = express.Router();

authRouter.get('/login', userController.getLoginInfo);
authRouter.post('/login/password', userController.loginWithPassword);
authRouter.post('/logout', userController.logout);
authRouter.post('/signup', userController.signup);
authRouter.patch('/updateuser', userController.editUserInfo);
authRouter.get('/users', userController.getAllUsers);

export default authRouter;
