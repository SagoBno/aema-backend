import dbBoot from "./db.boot.js";
import serverBoot from "./server.boot.js";
import routesBoot from "./routes.boot.js";
import passportBoot from "./passport.boot.js";
import generalMiddlewares from "./general-middlewares.boot.js";

export default (app) =>
  serverBoot(app)
    .then(passportBoot)
    .then(generalMiddlewares)
    .then(routesBoot)
    .then(dbBoot);
