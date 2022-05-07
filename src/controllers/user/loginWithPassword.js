import config from 'config';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { getEmailIPkey, getRetrySeconds } from '../../utils/rateLimiter.js';

const loginWithPassword = async (req, res, next) => {
  const ipAddr = req.ip;
  const emailIPkey = getEmailIPkey(req.body.email, ipAddr);
  const maxWrongAttemptsByIPperDay = config.get(
    'rateLimiter.slowBruteByIP.points',
  );
  const maxConsecutiveFailsByEmailAndIP = config.get(
    'rateLimiter.consecutiveFailsByUsernameAndIP.points',
  );

  const [emailAndIPRateLimiterInfo, slowByIPRateLimiterInfo] = await Promise.all([
    app.rateLimiters.consecutiveFailsByEmailAndIP.get(emailIPkey),
    app.rateLimiters.slowBruteByIP.get(ipAddr),
  ]);

  const retrySeconds = getRetrySeconds(slowByIPRateLimiterInfo, maxWrongAttemptsByIPperDay)
    || getRetrySeconds(emailAndIPRateLimiterInfo, maxConsecutiveFailsByEmailAndIP);
  const areNotRateLimited = retrySeconds > 0;

  if (areNotRateLimited) {
    res.set('Retry-After', String(retrySeconds));

    return res
      .status(StatusCodes.TOO_MANY_REQUESTS)
      .send(`Too many requests. Retry after ${retrySeconds} seconds.`);
  }

  return app.passport.authenticate('local', async (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      try {
        // Always increment IP attempt
        const promises = [app.rateLimiters.slowBruteByIP.consume(ipAddr)];
        if (info.name === 'IncorrectPasswordError') {
          // Increment Email + IP attempt
          promises.push(
            app.rateLimiters.consecutiveFailsByEmailAndIP.consume(emailIPkey),
          );
        }

        await Promise.all(promises);

        return res
          .status(StatusCodes.BAD_REQUEST)
          .send(ReasonPhrases.BAD_REQUEST);
      } catch (rateLimiterRejected) {
        if (rateLimiterRejected instanceof Error) {
          throw rateLimiterRejected;
        } else {
          const timeOut = String(Math.round(rateLimiterRejected.msBeforeNext / 1000)) || 1;
          res.set('Retry-After', timeOut);
          return res
            .status(StatusCodes.TOO_MANY_REQUESTS)
            .send(`Too many login attempts. Retry after ${timeOut} seconds`);
        }
      }
    }

    const haveWrongEmailWithIPAttempts = emailAndIPRateLimiterInfo !== null
      && emailAndIPRateLimiterInfo.consumedPoints > 0;
    if (haveWrongEmailWithIPAttempts) {
      // Remove wrong attempts if user login correctly
      await app.rateLimiters.consecutiveFailsByEmailAndIP.delete(emailIPkey);
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
