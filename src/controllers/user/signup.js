import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import userCases from '../../uses-cases/user/index.js';

const signup = async (req, res, next) => {
  try {
    await userCases.create(req.body);
    const user = await userCases.find(req.body.email);
    return req.logIn(user, (loginError) => {
      if (loginError) {
        return next(loginError);
      }
      return res.status(StatusCodes.ACCEPTED).send(ReasonPhrases.ACCEPTED);
    });
  } catch (error) {
    return next(error);
  }
};

export default signup;
