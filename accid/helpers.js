import {size, curry} from 'lodash/fp';
import {
  ofP,
} from 'dashp';
// adjust a function to take a list of units or a single unit as argument
// and return it in same format
export const oneOrMany = curry((func, arg) => {
  const narg = Array.isArray(arg) ? arg : [arg];
  return ofP(func(narg)) // eslint-disable-line
    .then(rs => (size(rs) > 1 ? rs : rs[0]));
});

export default {
  oneOrMany
};
