import crypto from "crypto";
import passport from "passport";
import LocalStrategy from "passport-local";

import User from "./db/models/User.js";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email", // define the parameter in req.body that passport can use as username and password
      passwordField: "password",
    },
    function verify(email, password, done) {
      User.findOne({
        where: {
          email,
        },
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

          return done(null, user, { scope: "all" });
        })
        .catch((error) => {
          return done(error);
        });
    }
  )
);

passport.serializeUser(function (user, done) {
  return done(null, { id: user.id, email: user.email });
});

passport.deserializeUser(function (user, done) {
  return done(null, user);
});

export default passport;
