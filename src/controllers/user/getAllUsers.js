import { ReasonPhrases, StatusCodes } from 'http-status-codes';

const getAllUsers = async (req, res) => {
  if (!req.user) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send(ReasonPhrases.UNAUTHORIZED);
  }
  const users = await app.db.User.findAll();
  return res.status(StatusCodes.OK).json({
    data: users,
  });
};

export default getAllUsers;
