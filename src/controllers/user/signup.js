import crypto from 'crypto';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

const signup = (req, res, next) => {
  const salt = crypto.randomBytes(16);
  crypto.pbkdf2(
    req.body.password,
    salt,
    310000,
    32,
    'sha256',
    async (err, hashedPassword) => {
      if (err) {
        return next(err);
      }

      try {
        const user = await app.db.User.create({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          genre: req.body.genre,
          birthday: req.body.birthday,
          password: hashedPassword,
          salt,
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
