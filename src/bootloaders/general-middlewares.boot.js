//import csrf from 'csurf';
import cors from "cors";
import config from "config";
import morgan from "morgan";
import bodyParser from "body-parser";
import session from "express-session";
import cookieParser from "cookie-parser";

export default (app) => {
  const { server } = app;
  server.use(morgan("combined"));
  server.use(cookieParser());
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(
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
  server.use(
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
  server.use(app.passport.initialize());
  server.use(app.passport.session());

  /*
    app.use(function(req, res, next) {
    res.locals.csrfToken = req.csrfToken();
    next();
    });
    */

  return Promise.resolve(app);
};
