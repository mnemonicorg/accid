import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import FileStore from 'session-file-store';

import initPassport from './init-passport';
import routing from './routing';
import { WEB_PORT } from '../config/app_config';

const FileSession = FileStore(session);

const isProd = false;

// Initialize Passport
initPassport(passport);

const app = express();

app.use(bodyParser.urlencoded({ extended: false })); // For body parser
app.use(bodyParser.json());
app.use(cookieParser());

// Configuring Passport
app.use(session({
  store: new FileSession(),
  secret: 'mySecretKey',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', routing(passport));

app.listen(WEB_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${WEB_PORT} ${isProd ? '(production)'
    : '(development).\nKeep "npm run dev:wds" running in an other terminal'}.`);
});
