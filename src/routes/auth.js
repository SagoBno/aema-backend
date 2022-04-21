import crypto from "crypto";
import express from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { ensureLoggedIn } from "connect-ensure-login";

import passport from "../passport.js";
import User from "../db/models/User.js";

const authRouter = express.Router();

authRouter.get("/login", function (req, res) {
  if (!req.user)
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send(ReasonPhrases.UNAUTHORIZED);
  return res.status(StatusCodes.OK).json({
    data: req.user,
  });
});

authRouter.post("/login/password", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send(ReasonPhrases.BAD_REQUEST);
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }

      return res.status(StatusCodes.ACCEPTED).send(ReasonPhrases.ACCEPTED);
    });
  })(req, res, next);
});

authRouter.post("/logout", function (req, res) {
  req.logout();
  req.session.destroy();
  return res.status(StatusCodes.ACCEPTED).send(ReasonPhrases.ACCEPTED);
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
          return res.status(StatusCodes.ACCEPTED).send(ReasonPhrases.ACCEPTED);
        });
      } catch (error) {
        return next(error);
      }
    }
  );
});

authRouter.get("/hola", ensureLoggedIn("/auth/login"), (req, res) => {
  return res.status(StatusCodes.OK).json({});
});

export default authRouter;
