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

import {oneOrMany} from '../helpers';

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
    console.log('getting');
    console.log(us);
    const annotationsToFields = u => {
      console.log('ayyyy');
      const annotationType = database(u.db).annotations;
      return annotations.getAnnotations(annotationType, u);
    };
    // return [];
    return flowP([
      store.get,
      (r) => (isArray(r) ? r : [r]), // make sure an array and not a single accid unit passed on
      collectP(annotationsToFields),
    ], us);
  };

  return {
    set: oneOrMany(setMany),
    get: oneOrMany(getMany),
    unset: store.unset,
  };
};

export default accid;
