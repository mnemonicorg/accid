import {
  curry,
  merge,
  omit,
  isString,
  map,
  groupBy
} from 'lodash/fp';
import {
  flowP,
  // tapP,
  ofP,
  collectP,
  allP
} from 'dashp';

import Promise from 'bluebird';

import {
  getNode as mongoGetNode,
  upsertOne,
  insertOne,
  removeOne,
  findMany
} from '../databases/mongodb';

import data from './data';
import {oneOrMany} from '../helpers';

const dbid = 'aid';
const collection = 'units';
const revisionsCollection = 'revisions';
const relationsCollection = 'relations';

// const hello = () => console.log('HELLO ITS accid');

const getNode = mongoGetNode;

// given a unit or a str accid id, transform to basic unit
const transformToU = x => {
  if (isString(x)) {
    return ({aid: x});
  }
  return data.unit(x);
};

// taking a list of units and str ids or a unit or str id,
// turn into list of units
const unitByAids = curry((func, arg) => {
  const narg = Array.isArray(arg) ? map(transformToU, arg) : transformToU(arg);
  return ofP(func(narg));
});

const store = ({connection}) => { // eslint-disable-line

  // unit id => {unit}
  const getDbUnit = ({aid}) => flowP([
    () => getNode(connection, collection, dbid, aid),
    data.unit
  ], null);

  // unit id => {query relations}
  const childrenQuery = ({aid}) => ({cluster_id: aid});
  // unit id => {query relations}
  const childrenQueryP = ({aid}) => ofP(childrenQuery({aid}));

  // unit id => {query relations}
  const parentQuery = ({aid}) => ({aid});
  // unit id => {query relations}
  const parentQueryP = ({aid}) => ofP(parentQuery({aid}));

  // unit id => {query unit}
  const unitQuery = ({aid}) => ({aid});
  // unit id => {query unit}
  const unitQueryP = ({aid}) => ofP(unitQuery({aid})); // eslint-disable-line

  // unit id => [{relation}]
  const children = ({aid}) =>
    flowP([childrenQueryP, findMany(connection, relationsCollection)], {aid});

  // unit id => [{relation}]
  const parents = ({aid}) =>
    flowP([parentQueryP, findMany(connection, relationsCollection)], {aid});

  // unit id => [related ids]
  const childrenUnitAids = ({aid}) => flowP([children, map('aid')], {aid});

  // unit id => [related ids]
  const parentUnits = ({aid}) => flowP([parents, map('cluster_id')], {aid});

  // unit id => [unit, [related ids]]
  // TODO: allP works weird when included in flow.  see other todo
  const collectUnitData = ({aid}) =>
    allP([getDbUnit({aid}), childrenUnitAids({aid}), parentUnits({aid})]);

  // [u, rs] => {unit}
  const mergeUnitRelations = ([u, cs, ps]) => merge(u, {cluster: cs, clusters: ps});


  // new unit, old unit => merged unit
  const unitAdd = curry(
    (newU, oldU) => {
      const merged = data.merge(oldU, newU);
      if (!data.equal(oldU, merged)) addRevision(merged);
      return merged;
    });

  const unitRemove = curry(
    (newU, oldU) => {
      if (!oldU) throw 'Unit not found!'; // eslint-disable-line
      const merged = data.without(oldU, newU);
      if (!data.equal(oldU, merged)) addRevision(oldU);
      return merged;
    });

  const storeAnnotations = omit(['_id', 'cluster']);

  const storeU = u => flowP([
    storeAnnotations,
    upsertOne(connection, collection, unitQuery(u)),
  ], u);

  const updateDbU = curry(
    (merger, u) => {
      const newUnit = data.unit(u);
      return flowP([
        getDbUnit,
        merger(newUnit),
        storeU
      ], {aid: newUnit.aid});
    });

  const setDbU = updateDbU(unitAdd);
  const unSetDbU = updateDbU(unitRemove);

  const setUAnnotations = ({aid, annotations}) => setDbU({aid, annotations});
  const setUIds = ({aid, db, id}) => setDbU({aid, db, id});

  const unSetUAnnotations = ({aid, annotations}) => unSetDbU({aid, annotations});
  // const unSetUIds = ({aid, db, id}) => unSetDbU({aid, db, id});


  const addRevision = flowP([
    storeAnnotations,
    merge({date: Date.now()}),
    insertOne(connection, revisionsCollection)
  ]);

  const setCluster = curry(
    ({aid, cluster}) =>
      Promise.each(cluster, cid => {
        const relation = {
          cluster_id: aid,
          aid: cid
        };
        return upsertOne(connection, relationsCollection, relation, relation);
      })
  );

  const unSetCluster = curry(
    ({aid, cluster}) =>
      Promise.each(cluster, cid => {
        const relation = {
          cluster_id: aid,
          aid: cid
        };
        return removeOne(connection, relationsCollection, relation);
      })
  );

  const setUnit = u => {
    const _u = data.unit(u);
    return flowP([
      () => setUAnnotations(_u),
      () => setCluster(_u),
      () => setUIds(_u),
      () => get(_u),
    ], null);
  };

  const unSetUnit = u => {
    const _u = data.unit(u);
    return flowP([
      () => unSetUAnnotations(_u),
      () => unSetCluster(_u),
      () => get(_u)
    ], null);
  };

  // unit id => {unit with relations}
  // TODO: this flow should function differently, but the allP in collectUnitData
  // is a little strange.
  const getUnit = ({aid, db, id}) =>
    flowP([
      collectUnitData(data.unit({aid, db, id})),
      mergeUnitRelations
    ], null);

  // accept str accid id (aid) OR unit with aid, or db, id
  // accept lists of these, or just one
  const io = f => unitByAids(oneOrMany(f));

  // [ids] => [{units}]
  const getMany = collectP(getUnit);
  const get = io(getMany);

  // [units] => [units]
  const setMany = collectP(setUnit);
  const set = io(setMany);

  const unSetMany = collectP(unSetUnit);
  const unset = io(unSetMany);

  return {
    get,
    set,
    unset,
  };
};

export default store;
