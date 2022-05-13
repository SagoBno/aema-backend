import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcrypt';

export default (appParam) => {
  const app = appParam;
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      (email, password, done) => app.db.User.findOne({
        where: {
          email,
        },
        raw: true,
      })
        .then(async (user) => {
          if (!user) {
            return done(null, false, {
              name: 'IncorrectUsernameError',
            });
          }
          try {
            const rightPassword = await bcrypt.compare(password, user.password);
            if (!rightPassword) {
              return done(null, false, {
                name: 'IncorrectPasswordError',
                message: 'Incorrect username or password.',
              });
            }
            return done(null, user);
          } catch (error) {
            return done(error);
          }
        })
        .catch((error) => done(error)),
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
