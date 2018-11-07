import {find, set as loSet, uniq, compact, isEmpty, isArray, unset as loUnset} from 'lodash/fp';
import {collectP} from 'dashp';
import database from '../../databases';
import s from '../../core/store';
import accidConfig from '../../../config/accid';
import data from '../../core/data';

const store = s(accidConfig);

const validatelatlon = v => {
  const t = typeof v;
  if (t === 'number') {
    return v;
  }
  if (t === 'string') {
    const d = parseFloat(v);
    if (d) return d;
  }
  return undefined;
}

export const LatLonField = {
  get: (u, k, v) => loSet(k, validatelatlon(v), u),
  set: (u, k, v) => loSet(k, validatelatlon(v), u),
};

export const booleanField = {
  get: (u, k, v) => loSet(k, (v === true || v === 'TRUE'), u),
  set: (u, k, v) => loSet(k, (v === true || v === 'TRUE'), u)
};

export const arrayClusterField = (dbName, dbIdField) => ({
  get: async (u, k, v) => {
    // console.log('suuuuppp');
    // console.log(k);
    // console.log(v);
    // console.time('arrayClusterFieldGet');
    if (!v) return u;
    if (isEmpty(v)) return u;
    const db = database(dbName);
    const as = await db.listAll();
    return collectP(vv => {
      const l = find(uu => uu[dbIdField] === vv.id, as) || find(uu => uu['id'] === vv.id, as);
      return vv.id;
      return l ? l[dbIdField] : undefined;
    }, v)
      .then(compact)
      .then(r => loSet(k, r, u));
    // .then(r => { console.timeEnd('arrayClusterFieldGet'); return r; });
  },
  set: (u, k, v) => {
    // console.time('arrayClusterFieldSet');
    console.log(dbIdField);
    console.log(v);
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
          if (!found) throw new Error('Required');
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
      })
      // .then(r => { console.timeEnd('arrayClusterFieldSet'); return r; });
  }
})


export const arrayRemoveClusterField = (dbName, dbIdField) => ({
  get: (u, k, v) => u, // eslint-disable-line
  set: (u, k, v) => {
    // console.time('arrayClusterFieldSet');
    console.log(u);
    console.log(dbIdField);
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    console.log(v);
    if (!v) return u;
    if (!isArray(v)) v = [v]
    const db = database(dbName);
    return db.listAll()
      .then(rs => {
        return collectP(vv => {
          const vvv = vv;
          const found = find(
            r => (String(r[dbIdField]) === String(vvv))
          )(rs);
          if (!found) console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'); // eslint-disable-line
          if (!found) console.log(vvv);
          if (!found) console.log(typeof vvv);
          if (!found) throw new Error('Required');
          if (!found) return u;
          // if (!found) throw 'NOOOOT FOUNNNDDDD'; // eslint-disable-line
          const uu = data.unit(u);
          const newU = data.unit({
            db: dbName,
            id: found[dbIdField],
            cluster: [uu.aid]
          });
          // const newUU = data.unit({
          //   db: dbName,
          //   id: found.id,
          //   cluster: [uu.aid]
          // });
          return store.unset(newU);
        })(uniq(compact(v)))
      })
      .then(() => {
        const p = loUnset(k, u);
        return p;
      })
      // .then(r => { console.timeEnd('arrayClusterFieldSet'); return r; });
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
    // console.time('locationClusterFieldGet');
    // console.log('suuuuppp');
    // console.log(k);
    // console.log(v);
    if (!v) return u;
    if (isEmpty(v)) return u;
    if (!isArray(v)) v = [v];
    const db = database('locations');
    return collectP(vv =>
      db.getNode(vv.id)
        .then(r => {
          // console.log(r);
          if (!r) return '';
          return r['search_name_ar'];
        })
        , v)
    .then(r => loSet(k, r, u))
    // return collectP(vv =>
    //   store.get(vv)
    //     .then(r => {
    //       // console.log(r);
    //       // console.log('heyyy');
    //       if (!r) return undefined;
    //       return db.getNode(r.id);
    //     })
    //     .then(r => {
    //       // console.log(r);
    //       if (!r) return undefined;
    //       return r['search_name_ar'];
    //     })
    //     , v)
    // .then(r => loSet(k, r, u))
    // .then(r => { console.timeEnd('locationClusterFieldGet'); return r; });
  },
  set: (u, k, v) => {
    // console.time('locationClusterFieldSet');
    const dbName = 'locations';
    const dbIdField = 'id';
    if (!v) return u;
    console.log('aaaaaaaaa');
    console.log(v);
    console.log(k);
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
      })
      // .then(r => { console.timeEnd('locationClusterFieldSet'); return r; });
  },
};

export default {
  booleanField,
};
