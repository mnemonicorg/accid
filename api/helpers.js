import {
  curry, keyBy, keys, map, xor, intersection, concat, merge, isEqual
} from 'lodash/fp';

const mergeArrays = curry((identical, merger, xIdentity, yIdentity, xs, ys) => {
  const x = keyBy(xIdentity, xs);
  const y = keyBy(yIdentity, ys);
  const kx = keys(x);
  const ky = keys(y);

  const same = intersection(kx, ky);
  const different = xor(kx, ky);

  const merged = map(id =>
    (identical(x[id], y[id]) ? x[id] : merger(x[id], y[id]))
  )(same);

  const notmerged = map(id => x[id] || y[id], different);
  return concat(merged, notmerged);
});

const mergeOneDbAud = (u2, u) => {
  const dbU = u;
  const au = {accid: u2};
  return merge(dbU, au);
};

const mergeAccid = mergeArrays(isEqual, mergeOneDbAud, 'id');

export {
  mergeArrays, mergeOneDbAud, mergeAccid
};
