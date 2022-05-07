import dbBoot from './db.boot.js';
import serverBoot from './server.boot.js';
import routesBoot from './routes.boot.js';
import passportBoot from './passport.boot.js';
import generalMiddlewares from './general-middlewares.boot.js';
import eventBusBoot from './eventBus.boot.js';
import cacheBoot from './cache.boot.js';
import rateLimiterBoot from './rate-limiter.boot.js';

export default (app) => serverBoot(app)
  .then(passportBoot)
  .then(generalMiddlewares)
  .then(routesBoot)
  .then(dbBoot)
  .then(eventBusBoot)
  .then(cacheBoot)
  .then(rateLimiterBoot);
