import create from './create.js';
import update from './update.js';
import loginWithPassword from './loginWithPassword.js';
import logout from './logout.js';
import getLoginInfo from './getLoginInfo.js';

const userCases = {
  create,
  update,
  loginWithPassword,
  logout,
  getLoginInfo,
};

export default userCases;
