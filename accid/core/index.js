import {
  flowP,
  // tapP,
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
      console.log('extraset');
      console.log(u.db);
      console.log(database(u.db).annotations);
      const db = database(u.db);
      const ann = annotations[db.annotations];
      console.log(ann);
      return ofP(u); // eslint-disable-line
    };

    return flowP([
      collectP(fieldsToAnnotations),
      store.set
    ], us);
  };

  return {
    set: oneOrMany(setMany),
    get: store.get,
    unset: store.unset
  };
};

export default accid;
