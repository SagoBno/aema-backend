import passport from 'passport';
import LocalStrategy from 'passport-local';

import nodeCryptoUtils from '../utils/nodeCrypto.js';
import userCases from '../uses-cases/user/index.js';
import { formatDate } from '../utils/dates.js';

export default (appParam) => {
  const app = appParam;
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        try {
          const user = await userCases.find(email);

          if (!user) {
            return done(null, false, {
              name: 'IncorrectUsernameError',
            });
          }
          const hashedPassword = await nodeCryptoUtils.encrypt(
            password,
            user.salt,
          );
          if (!nodeCryptoUtils.compare(user.password, hashedPassword)) {
            return done(null, false, {
              name: 'IncorrectPasswordError',
              message: 'Incorrect username or password.',
            });
          }
          return done(null, user);
        } catch (error) {
          done(error);
        }
        return '';
      },
    ),
  );

  passport.serializeUser(({
    password, salt, parentBirthday, childBirthday, ...restOfUser
  }, done) => done(null, {
    parentBirthday: formatDate(parentBirthday, 'YYYY-MM-DD'),
    childBirthday: formatDate(childBirthday, 'YYYY-MM-DD'),
    ...restOfUser,
  }));

  passport.deserializeUser((user, done) => done(null, user));

  app.passport = passport;

  return Promise.resolve(app);
};
