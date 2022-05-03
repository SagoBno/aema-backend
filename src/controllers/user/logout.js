import { ReasonPhrases, StatusCodes } from 'http-status-codes';

const logout = (req, res) => {
  req.logout();
  req.session.destroy();
  return res.status(StatusCodes.ACCEPTED).send(ReasonPhrases.ACCEPTED);
};

export default logout;
