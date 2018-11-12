import express from 'express';
import {
  pick, map, size, curry
} from 'lodash/fp';
import Promise from 'bluebird';
import {
  accid, database
} from '../accid';
import {
  mergeAccid
} from './helpers';
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

// router.post('/accid/get', (req, res) => {
//   console.log('getting annotations');
//   const auds = req.body;
//   const l = () => accid.get(auds);
//   return wrapRes(l, res);
// });

const getMergeAccid = curry((db, rs) => {
  const auds = map(r => ({
    id: r[db.id_key],
    db: db.name,
  }))(rs);
  return accid.getMany(auds).then(rauds => mergeAccid(db.id_key, rauds, rs)); // eslint-disable-line
});

router.get('/databases/:db/list', (req, res) => {
  const db = database(req.params.db);
  console.log(db);
  const l = () => db.list(req.params.db, 1).then(getMergeAccid(db));
  return wrapRes(l, res);
});

router.post('/databases/:db/filter', (req, res) => {
  const db = database(req.params.db);
  console.log('filtering db with following filters');
  console.log(req.body);
  const l = () => db.filter(req.body).then(getMergeAccid(db));
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
