import signup from './signup.js';
import logout from './logout.js';
import getLoginInfo from './getLoginInfo.js';
import loginWithPassword from './loginWithPassword.js';
import updateUserInfo from './updateUserInfo.js';
import getAllUsers from './getAllUsers.js';

const userController = {
  logout,
  getLoginInfo,
  loginWithPassword,
  signup,
  updateUserInfo,
  getAllUsers,
};

export default userController;
