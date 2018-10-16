import compression from 'compression';
import express from 'express';
import { Server } from 'http';
import socketIO from 'socket.io';
import expressSession from 'express-session';
import passport from 'passport';
import flash from 'connect-flash';

import routing from './routing';
import { WEB_PORT, STATIC_PATH } from '../../config/app_config';
import { isProd } from '../shared/util';
import setUpSocket from './socket';
import { initPassport } from './init-passport';

const app = express();
// flow-disable-next-line
const http = Server(app);
const io = socketIO(http);
setUpSocket(io);

app.use(compression());
app.use(STATIC_PATH, express.static('dist'));
app.use(STATIC_PATH, express.static('public'));

app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

initPassport(passport);

// concider to add flash and modify routes

routing(app, passport);

app.listen(WEB_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${WEB_PORT} ${isProd ? '(production)'
    : '(development).\nKeep "npm run dev:wds" running in an other terminal'}.`);
});
