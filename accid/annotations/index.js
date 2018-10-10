import {
  get, getOr
} from 'lodash/fp';
import {
  foldP, ofP
} from 'dashp';
import observation from './observation';
import incident from './incident';

const types = {
  observation, incident
};

const deefault = (u) => u;

const objectDeepKeys = (obj) =>
  Object.keys(obj)
    .filter(key => obj[key] instanceof Object)
    .map(key => objectDeepKeys(obj[key])
      .map(k => `${key}.${k}`))
    .reduce((x, y) => x.concat(y), Object.keys(obj));


const annotate = (type, accidUnit) => {
  if (!types[type]) console.warn(` ANNOTATION TYPE ${type} not found`);
  const t = types[type] || {};

  const fields = accidUnit.annotations;
  const unit = accidUnit;

  const importingKs = objectDeepKeys(fields);
  const alterations = t.fields;

  const reduceKeys = foldP(
    (a, k) => {
      const val = get(k, fields);
      const setter = getOr({}, k, alterations).set;
      if (!setter) return ofP(deefault(a));
      return ofP(setter(a, k, val));
      // .then(r => set(k, r, a));
    },
    unit);
  return reduceKeys(importingKs);
};

const getAnnotations = (type, accidUnit) => {
  if (!types[type]) console.warn(` ANNOTATION TYPE ${type} not found`);
  const t = types[type] || {fields: {}};

  const fields = accidUnit.annotations;
  const unit = accidUnit;

  const alterations = t.fields;
  console.log(objectDeepKeys(alterations));
  const importingKs = objectDeepKeys(fields);
  return ofP(accidUnit);
}

const prefill = {};

export default {
  annotate, prefill, getAnnotations
};
