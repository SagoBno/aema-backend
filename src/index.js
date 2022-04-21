import express from "express";

//import csrf from 'csurf';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import session from 'express-session';
import cookieParser from 'cookie-parser';


import passport from "./passport.js";

import authRouter from "./routes/auth.js";

const app = express();
const port = 3001;

const sess = {
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}

app.use(morgan('combined'));
app.use(cors());
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session(sess));
//app.use(csrf());
app.use(passport.initialize()) 
app.use(passport.session());

/*app.use(function(req, res, next) {
  res.locals.csrfToken = req.csrfToken();
  next();
});*/

app.use('/auth', authRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
