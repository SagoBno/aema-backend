import { ReasonPhrases, StatusCodes } from 'http-status-codes';

const getLoginInfo = (req, res) => {
  if (!req.user) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send(ReasonPhrases.UNAUTHORIZED);
  }

  return res.status(StatusCodes.OK).json({
    data: req.user,
  });
};

export default getLoginInfo;
