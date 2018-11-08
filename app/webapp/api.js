import {curry} from 'lodash/fp';
import Promise from 'bluebird';
import {flowP} from 'dashp';
import http from './http';
import {API_URL} from '../../config/app_config';


const databasesUrl = `${API_URL}/databases`;
const databaseUrl = (db) => `${databasesUrl}/${db}`;
const databaseListUrl = (db) => `${databasesUrl}/${db}/list`;

const getMethod = { method: 'GET' };

const resCheck = curry(res => {
  if (!res.ok) throw Error(res.statusText);
  return Promise.resolve(res.json()); // eslint-disable-line
});

const databases = () => flowP([
  http.fetch(databasesUrl),
  resCheck
], getMethod);

const database = db => flowP([
  http.fetch(databaseUrl(db)),
  resCheck
], getMethod);

const list = db => flowP([
  http.fetch(databaseListUrl(db)),
  resCheck
], getMethod);

export default {
  databases,
  database,
  list
};
