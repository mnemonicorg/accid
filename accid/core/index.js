import {merge, isArray} from 'lodash/fp';


import {
  flowP,
  tapP,
  ofP,
  collectP,
} from 'dashp';
import s from './store';

import database from '../databases';
import annotations from '../annotations';

import {findMany} from '../databases/mongodb';

import {oneOrMany} from '../helpers';

const unitscollection = 'units';

const accid = ({connection}) => {
  const store = s({connection});

  const setMany = us => {
    const fieldsToAnnotations = u => {
      const annotationType = database(u.db).annotations;
      return annotations.annotate(annotationType, u);
    };



    return flowP([
      collectP(fieldsToAnnotations),
      store.set
    ], us);
  };

  const getMany = us => {
    // console.log(us);
    const annotationsToFields = u => {
      // console.log('ayyyy');
      // console.log(u);
      const annotationType = database(u.db).annotations;
      return annotations.getAnnotations(annotationType, u).catch(console.log);
    };
    // return [];
    console.time('getting');
    return flowP([
      store.get,
      r => { console.timeEnd('getting'); console.time('annotating'); return r; },
      (r) => (isArray(r) ? r : [r]), // make sure an array and not a single accid unit passed on
      collectP(annotationsToFields),
      r => { console.timeEnd('annotating'); return r; },

    ], us);
  };

  return {
    set: oneOrMany(setMany),
    get: oneOrMany(getMany),
    getMany,
    setMany,
    unset: store.unset,
    findMany: findMany(connection, unitscollection),
  };
};

export default accid;
