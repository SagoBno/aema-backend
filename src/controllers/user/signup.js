import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';

import userCases from '../../uses-cases/user/index.js';

const signup = async (req, res, next) => {
  const salt = await bcrypt.genSalt(16);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  try {
    const user = await userCases.create({
      parentFirstName: req.body.parentFirstName,
      parentLastName: req.body.parentLastName,
      parentBirthday: req.body.parentBirthday,
      email: req.body.email,
      password: hashedPassword,
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
