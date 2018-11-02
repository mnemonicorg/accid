import express from 'express';
import bodyParser from 'body-parser';
import expressSession from 'express-session';
import passport from 'passport';

import initPassport from './init-passport';
import routing from './routing';
import { WEB_PORT, isProd } from '../config/app_config';

const app = express();
app.use(bodyParser.urlencoded({ extended: false })); //For body parser
app.use(bodyParser.json());

// Configuring Passport
app.use(expressSession({
  secret: 'mySecretKey',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Initialize Passport
initPassport(passport);

routing(app, passport);

app.listen(WEB_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${WEB_PORT} ${isProd ? '(production)'
    : '(development).\nKeep "npm run dev:wds" running in an other terminal'}.`);
});
