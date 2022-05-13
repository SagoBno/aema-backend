import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import userCases from '../../uses-cases/user/index.js';
import cryptoUtils from '../../utils/crypto.js';

const signup = (req, res, next) => {
  const salt = cryptoUtils.createSalt();
  cryptoUtils.encrypt(
    req.body.password,
    salt,
    async (err, hashedPassword) => {
      if (err) {
        return next(err);
      }

      try {
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
    },
  );
};

export default signup;
