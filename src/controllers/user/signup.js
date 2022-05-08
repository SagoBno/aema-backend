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
      console.log(req.body, 'req.body');

      try {
        const user = await app.db.User.create({
          parentFirstName: req.body.parentFirstName,
          parentLastName: req.body.parentLastName,
          parentBirthday: req.body.parentBirthday,
          email: req.body.email,
          password: hashedPassword,
          genre: req.body.genre,
          childFirstName: req.body.childFirstName,
          childLastName: req.body.childLastName,
          childBirthday: req.body.childBirthday,
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
