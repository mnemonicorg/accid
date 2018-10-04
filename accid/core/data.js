import {
  curry,
  merge as loMerge,
  getOr,
  isEqual,
  keys,
  set,
  pick,
  isNil,
  difference,
} from 'lodash/fp';
import sha256 from 'sha256';

// create a unit out of a minimum of {db, id}
const unit = curry(
  (u) => {
    const i = getAid(u);
    if (!i) return undefined;
    const cid = {
      aid: i,
      db: getDb(u),
      id: getId(u),
      annotations: getAnnotations(u),
      cluster: getCluster(u),
    };
    return cid;
  });

const shaU = u => {
  const i = getId(u);
  const d = getDb(u);
  if (isNil(i) || isNil(d)) return undefined;
  return sha256(`${i}-${d}`);
};

const getId = getOr(undefined, 'id');
const getDb = getOr(undefined, 'db');
const getAid = u => getOr(undefined, 'aid', u) || shaU(u);

const getCluster = getOr([], 'cluster');


const getAnnotations = aa => {
  const initial = getOr({}, 'annotations', aa);
  return initial;
};

const equal = curry(
  (u1, u2) => {
    if (!u1 || !u2) return false;
    return isEqual(unit(u1).annotations, unit(u2).annotations);
  });

const merge = curry(
  (u1, u2) => {
    const fi = getAnnotations(u2);
    const m = loMerge(u1, {
      aid: getAid(u2),
      id: getId(u2),
      db: getDb(u2),
      annotations: fi
    });
    return m;
  }
);

const without = curry(
  (u1, u2) => {
    const k1 = keys(getAnnotations(u1));
    const k2 = keys(getAnnotations(u2));
    const ks = difference(k1, k2);
    const m = pick(ks, getAnnotations(u1));
    const u = set('annotations', m, u1);

    return u;
  }
);

export default {
  unit,
  equal,
  merge,
  without,
};
