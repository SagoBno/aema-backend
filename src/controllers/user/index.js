import signup from './signup.js';
import logout from './logout.js';
import getLoginInfo from './getLoginInfo.js';
import loginWithPassword from './loginWithPassword.js';
import editUserInfo from './editUserInfo.js';
import getAllUsers from './getAllUsers.js';

const userController = {
  logout,
  getLoginInfo,
  loginWithPassword,
  signup,
  editUserInfo,
  getAllUsers,
};

export default userController;
