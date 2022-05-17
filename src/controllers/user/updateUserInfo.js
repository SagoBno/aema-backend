import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import userCases from '../../uses-cases/user/index.js';

const updateUserInfo = async (req, res, next) => {
  if (!req.user) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send(ReasonPhrases.UNAUTHORIZED);
  }
  try {
    await userCases.update(req.body, req.user.email);
    const user = await userCases.find(req.user.email);
    return req.logIn(user, (loginError) => {
      if (loginError) {
        return next(loginError);
      }
      return res.status(StatusCodes.OK).send('Perfil actualizado correctamente');
    });
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
  }
};

export default updateUserInfo;
