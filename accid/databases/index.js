import {find, merge} from 'lodash/fp';

import sugarcube from './sugarcube';
import json from './json';

import dbConfig from '../../config/databases.json';

const databases = {
  sugarcube,
  json,
};

const database = name => {
  const config = find(d => d.name === name)(dbConfig);
  const db = databases[config.type];
  const d = db(config);
  return merge(config, d);
};

export default database;
