import { ReasonPhrases, StatusCodes } from 'http-status-codes';

const logout = (req, res) => {
  req.logout();
  req.session = null;
  return res.status(StatusCodes.ACCEPTED).send(ReasonPhrases.ACCEPTED);
};

export default logout;
