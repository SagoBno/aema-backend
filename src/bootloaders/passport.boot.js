import passport from 'passport';
import LocalStrategy from 'passport-local';

import nodeCryptoUtils from '../utils/nodeCrypto.js';

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
          // Here we must use the repositories or use-cases methods
          const user = await app.db.User.findOne({
            where: {
              email,
            },
            raw: true,
          });

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

  passport.serializeUser((user, done) => done(null, {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  }));

  passport.deserializeUser((user, done) => done(null, user));

  app.passport = passport;

  return Promise.resolve(app);
};
