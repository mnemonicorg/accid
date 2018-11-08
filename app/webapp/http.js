import 'isomorphic-fetch';
import {curry} from 'lodash/fp';

const f = curry(
  (url, d) => fetch(url, d)
);

export default {
  fetch: f
};
