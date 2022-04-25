//import csrf from 'csurf';
import cors from "cors";
import config from "config";
import morgan from "morgan";
import bodyParser from "body-parser";
import session from "express-session";
import cookieParser from "cookie-parser";

import passport from "../passport.js";

export default (app) => {
  app.use(morgan("combined"));
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(
    session({
      secret: config.get("session.secret"),
      resave: false,
      saveUninitialized: true,
      cookie: {
        httpOnly: true,
        secure: config.get("session.cookie.secure"),
      },
    })
  );
  app.use(
    cors({
      credentials: true,
      origin: (origin, callback) => {
        if (config.get("server.whitelist").indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
    })
  );
  //app.use(csrf());
  app.use(passport.initialize());
  app.use(passport.session());

  /*app.use(function(req, res, next) {
    res.locals.csrfToken = req.csrfToken();
    next();
  });*/
};
