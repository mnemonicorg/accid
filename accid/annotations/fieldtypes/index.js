import {find, set as loSet, uniq, compact, isEmpty, isArray, unset as loUnset} from 'lodash/fp';
import {collectP} from 'dashp';
import database from '../../databases';
import s from '../../core/store';
import accidConfig from '../../../config/accid';
import data from '../../core/data';

const store = s(accidConfig);

export const booleanField = {
  get: (u, k, v) => loSet(k, v, u),
  set: (u, k, v) => loSet(k, (v === true || v === 'TRUE'), u)
};

export const arrayClusterField = (dbName, dbIdField) => ({
  get: (u, k, v) => {
    console.log('suuuuppp');
    console.log(k);
    console.log(v);
    if (!v) return u;
    if (isEmpty(v)) return u;
    const db = database(dbName);
    return collectP(vv =>
      store.get(vv)
        .then(r => {
          console.log(r);
          console.log('heyyy');
          if (!r) return undefined;
          return db.getNode(r.id);
        })
        .then(r => {
          console.log(r);
          if (!r) return undefined;
          return r[dbIdField];
        })
        , v)
    .then(r => loSet(k, r, u));
  },
  set: (u, k, v) => {
    if (!v) return u;
    if (!isArray(v)) v = [v]
    const db = database(dbName);
    return db.listAll()
      .then(rs => {
        return collectP(vv => {
          const vvv = vv.toLowerCase().trim();
          const found = find(
            r => (r[dbIdField].toLowerCase() === vvv.toLowerCase())
          )(rs);
          if (!found) console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'); // eslint-disable-line
          if (!found) console.log(vvv);
          if (!found) return u;
          // if (!found) throw 'NOOOOT FOUNNNDDDD'; // eslint-disable-line
          const uu = data.unit(u);
          const newU = data.unit({
            db: dbName,
            id: found[dbIdField],
            cluster: [uu.aid]
          });
          return store.set(newU);
        })(uniq(compact(v)))
      })
      .then(() => {
        const p = loUnset(k, u);
        return p;
      });
  }
})

// export const singleClusterField = (dbName, dbIdField) => ({
//   get: (u, k, v) => u,
//   set: (u, k, v) => {
//     if (!v) return u;
//     const vv = v.trim();
//
//     const db = database(dbName);
//
//     return db.listAll()
//       .then(rs => {
//         const found = find(
//           l => (l[dbIdField] === vv)
//         )(rs);
//         if (!found) console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'); // eslint-disable-line
//         if (!found) console.log(v);
//         if (!found) return u;
//         // if (!found) throw 'NOOOOT FOUNNNDDDD'; // eslint-disable-line
//         const uu = data.unit(u);
//         const newU = data.unit({
//           db: dbName,
//           id: found[dbIdField],
//           cluster: [uu.aid]
//         });
//         return store.set(newU);
//       })
//       .then(() => {
//         const p = loSet(`annotations.${k}`, v, u);
//         return p;
//       });
//   },
// });

export const locationClusterField = {
  get: (u, k, v) => {
    console.log('suuuuppp');
    console.log(k);
    console.log(v);
    if (!v) return u;
    if (isEmpty(v)) return u;
    if (!isArray(v)) v = [v];
    const db = database('locations');
    return collectP(vv =>
      store.get(vv)
        .then(r => {
          console.log(r);
          console.log('heyyy');
          if (!r) return undefined;
          return db.getNode(r.id);
        })
        .then(r => {
          console.log(r);
          if (!r) return undefined;
          return r['search_name_ar'];
        })
        , v)
    .then(r => loSet(k, r, u));
  },
  set: (u, k, v) => {
    const dbName = 'locations';
    const dbIdField = 'id';
    if (!v) return u;
    const vv = v.trim();
    let actualval = v;

    const db = database(dbName);

    return db.listAll()
      .then(locs => {
        const found = find(
          l => (l.old_sa_name === vv || l.search_name_ar === vv || l.search_name_ar_short === vv)
        )(locs);
        if (!found) console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'); // eslint-disable-line
        if (!found) console.log(v);
        if (!found) return u;
        // if (!found) throw 'NOOOOT FOUNNNDDDD'; // eslint-disable-line
        actualval = found.search_name_ar;
        const uu = data.unit(u);
        const newU = data.unit({
          db: dbName,
          id: found.id,
          cluster: [uu.aid]
        });
        return store.set(newU);
      })
      .then(() => {
        const p = loUnset(k, u);
        return p;
      });
  },
};

export default {
  booleanField,
};
