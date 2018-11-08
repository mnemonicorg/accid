import express from 'express';
import {
  pick, map, size
} from 'lodash/fp';
import Promise from 'bluebird';
import {
  accid, database
} from '../accid';
import dbs from '../config/databases.json';

// import {
//   database
// } from '../accid/databases';
import actions from '../actions';

const router = express.Router();

const parseHrtimeToSeconds = (hrtime) => {
  const seconds = (hrtime[0] + (hrtime[1] / 1e9)).toFixed(3);
  return seconds;
};

const wrapRes = (fn, res) => {
  const startTime = process.hrtime();
  return fn()
      .then(r => Promise.resolve({ // eslint-disable-line
      apiTime: parseHrtimeToSeconds(process.hrtime(startTime)),
      size: size(r),
      result: r,
    }))
    .then(r => res.send(r));
};

// var startTime = process.hrtime();
// do some task...
// var elapsedSeconds = parseHrtimeToSeconds(process.hrtime(startTime));

const onlyDbFields = pick(['name', 'type', 'description']);

router.get('/', (req, res) => res.send({hello: 'world'}));

router.get('/actions', (req, res) => {
  res.send(map('config', actions));
});

router.post('/actions/:name', (req, res) => {
  const {args} = req.body;
  actions[req.params.name](args);
  res.send({suc: 'ces'});
});

router.get('/databases',
  (req, res) => {
    const d = () => Promise.resolve(map(onlyDbFields, dbs)); // eslint-disable-line
    return wrapRes(d, res);
  });

router.get('/accid',
  (req, res) =>
    wrapRes(accid.get('jjj'), res)
);

router.get('/databases/:db/list', (req, res) => {
  const db = database(req.params.db);
  const l = () => db.list(req.params.db, 1);
  return wrapRes(l, res);
});

router.get('/databases/:db/:term', (req, res) => {
  const db = database(req.params.db);
  return db.search(req.params.term).then(
    r => res.send(r));
});

router.get('/databases/:db', (req, res) => {
  const df = () => Promise.resolve(database(req.params.db)); // eslint-disable-line
  return wrapRes(df, res);
});

export default router;
