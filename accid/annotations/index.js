import {
  get, getOr, groupBy, mapValues, map, merge, has, isArray
} from 'lodash/fp';
import {
  foldP, ofP, flowP
} from 'dashp';
import observation from './observation';
import incident from './incident';

import s from '../core/store';
import accidConfig from '../../config/accid';

const store = s(accidConfig);

const types = {
  observation, incident
};

const deefault = (u) => u;

const objectDeepKeys = (obj) =>
  Object.keys(obj)
    .filter(key => obj[key] instanceof Object)
    .map(key => objectDeepKeys(obj[key])
      .map(k => `${key}.${k}`))
    .reduce((x, y) => x.concat(y), Object.keys(obj).filter(d => (!(obj[d] instanceof Function))));


const annotate = (type, accidUnit) => {
  if (!types[type]) console.warn(` ANNOTATION TYPE ${type} not found`);
  const t = types[type] || {};

  const fields = {
    annotations: accidUnit.annotations,
    clusters: accidUnit.clusters
  };
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

const getAnnotations = async (type, accidUnit) => {
  if (!types[type]) console.warn(` ANNOTATION TYPE ${type} not found`);
  const t = types[type] || {fields: {}};
  const alterations = t.fields;

  const cl = await flowP([
    store.getMany,
    groupBy(x => x.db),
    mapValues(map('aid'))
  ], accidUnit.clusters);

  if (has('undefined', cl)) {
    console.log('aaaaaaaaaaa');
    console.log(accidUnit.aid);
    console.log(accidUnit.clusters);
    console.log(cl);
    throw Error;
  }

  const fields = {
    annotations: accidUnit.annotations,
    clusters: cl
  };

  const unit = {
    aid: accidUnit.aid,
    db: accidUnit.db,
    id: accidUnit.id,
    cluster: accidUnit.cluster,
    annotations: fields.annotations,
    clusters: cl
  };

  const exportingks = objectDeepKeys(fields);

  const reduceKeys = foldP(
    (a, k) => {
      const val = get(k, fields);
      const setter = getOr({}, k, alterations).get;
      if (!setter) return ofP(deefault(a));
      return ofP(setter(a, k, val));
      // .then(r => set(k, r, a));
    },
    unit);
  return reduceKeys(exportingks);
  // return ofP(accidUnit);
};

const prefill = {};

export default {
  annotate, prefill, getAnnotations
};
