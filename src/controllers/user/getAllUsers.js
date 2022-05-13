import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import userCases from '../../uses-cases/user/index.js';

const getAllUsers = async (req, res) => {
  if (!req.user) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send(ReasonPhrases.UNAUTHORIZED);
  }
  const users = await userCases.getAll();
  return res.status(StatusCodes.OK).json({
    data: users,
  });
};

export default getAllUsers;
