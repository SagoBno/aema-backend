import crypto from "crypto";
import express from "express";
import { ensureLoggedIn } from "connect-ensure-login";

import passport from "../passport.js";
import User from "../db/models/User.js";

const authRouter = express.Router();

authRouter.get("/login", function (req, res) {
  if(!req.user) return res.status(500).send();
  return res.status(201).send();
});

authRouter.post("/login/password", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(400).json({ error: info });
    }

    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }

      return res.status(201).send();
    });
  })(req, res, next);
});

authRouter.post("/logout", function (req, res, next) {
  req.logout();
  return res.status(201).send();
});

authRouter.post("/signup", (req, res, next) => {
  const salt = crypto.randomBytes(16);
  crypto.pbkdf2(
    req.body.password,
    salt,
    310000,
    32,
    "sha256",
    async (err, hashedPassword) => {
      if (err) {
        return next(err);
      }

      try {
        const user = await User.create({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: hashedPassword,
          salt: salt,
        });

        req.login(user, (err) => {
          if (err) {
            return next(err);
          }
          return res.status(201).send();
        });
      } catch (error) {
        return next(error);
      }
    }
  );
});

authRouter.get("/hola", ensureLoggedIn("/auth/login"), (req, res) => {
  res.status(200).json({});
});

export default authRouter;
