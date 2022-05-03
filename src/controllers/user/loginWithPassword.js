import { ReasonPhrases, StatusCodes } from 'http-status-codes';

const loginWithPassword = (req, res, next) => {
  app.passport.authenticate('local', (err, user) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send(ReasonPhrases.BAD_REQUEST);
    }

    return req.logIn(user, (loginError) => {
      if (loginError) {
        return next(loginError);
      }

      return res.status(StatusCodes.ACCEPTED).send(ReasonPhrases.ACCEPTED);
    });
  })(req, res, next);
};

export default loginWithPassword;
