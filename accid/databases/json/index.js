import Promise from 'bluebird';
import {curry, find} from 'lodash/fp';

export const getJson = path => require(path); // eslint-disable-line

export const getNode = curry((connection, key, id) => {
  const j = getJson(connection);
  return Promise.resolve(find(u => u[key] === id, j)) // eslint-disable-line
});

export const list = curry((connection) => {
  const j = getJson(connection);
  return Promise.resolve(j) // eslint-disable-line
});


export default (config) => ({
  getNode: getNode(config.connection, config.id_key), // eslint-disable-line
  list: () => list(config.connection),
  id_key: config.id_key
});

// config values: connection, collection, id_key
