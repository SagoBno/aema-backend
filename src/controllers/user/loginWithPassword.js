import { ReasonPhrases, StatusCodes } from "http-status-codes";

const loginWithPassword = (req, res, next) => {
  app.passport.authenticate("local", (err, user) => {
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
};

export default loginWithPassword;
