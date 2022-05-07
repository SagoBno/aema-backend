import cors from 'cors';
import csrf from 'csurf';
import config from 'config';
import morgan from 'morgan';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import session from 'cookie-session';
import cookieParser from 'cookie-parser';

export default (appParam) => {
  const app = appParam;
  const { server } = app;
  server.use(morgan('combined'));
  server.use(cookieParser());
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));

  if (config.get('isProduction')) {
    server.set('trust proxy', 1);
  }
  server.use(
    session({
      secret: config.get('session.secret'),
      resave: false,
      saveUninitialized: true,
      cookie: {
        httpOnly: true,
        secure: config.get('session.cookie.secure'),
        domain: config.get('session.cookie.domain'),
      },
    }),
  );
  server.use(
    cors({
      credentials: true,
      origin: (origin, callback) => {
        if (config.get('server.whitelist').indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
    }),
  );
  server.use(app.passport.initialize());
  server.use(app.passport.session());

  server.use(csrf({
    cookie: {
      httpOnly: true,
      secure: config.get('csrf.cookie.secure'),
      domain: config.get('csrf.cookie.domain'),
    },
  }));

  server.use((req, res, next) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    next();
  });

  if (config.get('isProduction')) {
    server.use(helmet());
  }

  return Promise.resolve(app);
};
