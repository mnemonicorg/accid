import {
  reduce, get, getOr, set
} from 'lodash/fp';
import observation from './observation';
import incident from './incident';

const types = {
  observation, incident
};

const deefault = (v) => v;

const objectDeepKeys = (obj) =>
  Object.keys(obj)
    .filter(key => obj[key] instanceof Object)
    .map(key => objectDeepKeys(obj[key])
      .map(k => `${key}.${k}`))
    .reduce((x, y) => x.concat(y), Object.keys(obj));

const annotate = (type, fields) => {
  const t = types[type];

  const importingKs = objectDeepKeys(fields);
  const alterations = t.fields;

  const reduceKeys = reduce((a, k) => {
    const val = get(k, fields);
    const setter = getOr({}, k, alterations).set;
    if (!setter) return set(k, deefault(val), a);
    return set(k, setter(val), a);
  }, {});

  const r = reduceKeys(importingKs);
  return r;
};

const prefill = {};

export default {
  annotate, prefill
};
