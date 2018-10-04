import {merge} from 'lodash/fp';
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
      const annotationType = database(u.db).annotations;
      return annotations.annotate(annotationType, u)
        .then(as => ofP(merge(u, as))); // eslint-disable-line
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
