import crypto from "crypto";
import passport from "passport";
import LocalStrategy from "passport-local";

import User from "./db/models/User.js";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function verify(email, password, done) {
      User.findOne({
        where: {
          email,
        },
        raw: true,
      })
        .then((user) => {
          if (!user) {
            return done(null, false, {
              message: "Incorrect email or password.",
            });
          }

          crypto.pbkdf2(
            password,
            user.salt,
            310000,
            32,
            "sha256",
            function (err, hashedPassword) {
              if (err) {
                return done(err);
              }
              if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
                return done(null, false, {
                  message: "Incorrect email or password.",
                });
              }

              return done(null, user);
            }
          );
        })
        .catch((error) => {
          return done(error);
        });
    }
  )
);

passport.serializeUser((user, done) => {
  return done(null, {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  });
});

passport.deserializeUser((user, done) => {
  return done(null, user);
});

export default passport;
