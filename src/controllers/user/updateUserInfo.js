import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import userCases from '../../uses-cases/user/index.js';

const updateUserInfo = async (req, res) => {
  if (!req.user) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send(ReasonPhrases.UNAUTHORIZED);
  }
  try {
    await userCases.update(req.body, req.user.email);
    req.user.email = req.body.email;
    return res.status(StatusCodes.OK).send('Perfil actualizado correctamente');
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
  }
};

export default updateUserInfo;
