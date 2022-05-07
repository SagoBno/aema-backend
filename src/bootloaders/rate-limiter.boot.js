import config from 'config';
import { RateLimiterRedis } from 'rate-limiter-flexible';

export default (appParam) => {
  const app = appParam;
  const maxWrongAttemptsByIPperDay = config.get('rateLimiter.slowBruteByIP.points');
  const maxConsecutiveFailsByEmailAndIP = config.get('rateLimiter.consecutiveFailsByUsernameAndIP.points');

  app.rateLimiters ??= {};

  app.rateLimiters.slowBruteByIP = new RateLimiterRedis({
    storeClient: app.redis,
    keyPrefix: config.get('rateLimiter.slowBruteByIP.keyPrefix'),
    points: maxWrongAttemptsByIPperDay,
    duration: config.get('rateLimiter.slowBruteByIP.duration'),
    blockDuration: config.get('rateLimiter.slowBruteByIP.blockDuration'),
  });

  app.rateLimiters.consecutiveFailsByEmailAndIP = new RateLimiterRedis({
    storeClient: app.redis,
    keyPrefix: config.get('rateLimiter.consecutiveFailsByUsernameAndIP.keyPrefix'),
    points: maxConsecutiveFailsByEmailAndIP,
    duration: config.get('rateLimiter.consecutiveFailsByUsernameAndIP.duration'),
    blockDuration: config.get('rateLimiter.consecutiveFailsByUsernameAndIP.blockDuration'),
  });

  return Promise.resolve(app);
};
