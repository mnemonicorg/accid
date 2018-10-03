import express from 'express';
// import { Server } from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';

import routing from './rest-api';

import { isProd } from '../app/shared/util';

const WEB_PORT = 8666;

const app = express();
// flow-disable-next-line
// const http = Server(app);


app.use(cors());
app.use(bodyParser.json());

routing(app);

app.listen(WEB_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`API Server running on port ${WEB_PORT} ${isProd ? '(production)'
    : '(development).\nKeep "npm run dev:wds" running in an other terminal'}.`);
});
