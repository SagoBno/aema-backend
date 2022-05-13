import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import userCases from '../../uses-cases/user/index.js';
import nodeCryptoUtils from '../../utils/nodeCrypto.js';

const signup = async (req, res, next) => {
  try {
    // We can move some of this logic to the repositories or use-cases methods
    const salt = nodeCryptoUtils.createSalt();
    const hashedPassword = await nodeCryptoUtils.encrypt(
      req.body.password,
      salt,
    );
    const user = await userCases.create({
      parentFirstName: req.body.parentFirstName,
      parentLastName: req.body.parentLastName,
      parentBirthday: req.body.parentBirthday,
      email: req.body.email,
      password: hashedPassword,
      salt,
      genre: req.body.genre,
      childFirstName: req.body.childFirstName,
      childLastName: req.body.childLastName,
      childBirthday: req.body.childBirthday,
    });
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
