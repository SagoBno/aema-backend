import crypto from 'crypto';
import passport from 'passport';
import LocalStrategy from 'passport-local';

export default (appParam) => {
  const app = appParam;
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      ((email, password, done) => {
        app.db.User.findOne({
          where: {
            email,
          },
          raw: true,
        })
          .then((user) => {
            if (!user) {
              return done(null, false, {
                message: 'Incorrect email or password.',
              });
            }

            crypto.pbkdf2(
              password,
              user.salt,
              310000,
              32,
              'sha256',
              (err, hashedPassword) => {
                if (err) {
                  return done(err);
                }
                if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
                  return done(null, false, {
                    message: 'Incorrect email or password.',
                  });
                }

                return done(null, user);
              },
            );
            return done(null);
          })
          .catch((error) => done(error));
      }),
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
