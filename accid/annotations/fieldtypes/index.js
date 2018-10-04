import {find, set as loSet, uniq, compact} from 'lodash/fp';
import {collectP} from 'dashp';
import database from '../../databases';
import s from '../../core/store';
import accidConfig from '../../../config/accid';
import data from '../../core/data';

const store = s(accidConfig);

export const booleanField = {
  get: (u, k, v) => loSet(`annotations.${k}`, v, u),
  set: (u, k, v) => loSet(`annotations.${k}`, (v === true || v === 'TRUE'), u)
};

export const arrayClusterField = (dbName, dbIdField, findFunc) => ({
  get: (u, k, v) => u,
  set: (u, k, v) => {
    if (!v) return u;
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
        const p = loSet(`annotations.${k}`, uniq(compact(v)), u);
        return p;
      });
  }
})

export const locationClusterField = {
  get: (u, k, v) => u,
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
        const p = loSet('annotations.location', actualval, u);
        return p;
      });
  },
};

export default {
  booleanField,
};
