import {curry} from 'lodash/fp';
import Promise from 'bluebird';
import {flowP} from 'dashp';
import http from './http';
import {API_URL} from '../../config/app_config';


const databasesUrl = `${API_URL}/databases`;
const databaseUrl = (db) => `${databasesUrl}/${db}`;
const databaseListUrl = (db) => `${databasesUrl}/${db}/list`;
const databaseFilterUrl = (db) => `${databasesUrl}/${db}/filter`;

const getAnnotationsUrl = `${databasesUrl}/accid/get`;


const getMethod = {
  method: 'GET',
  withCredentials: true,
  credentials: 'same-origin',
};

const postMethod = (body) => ({
  method: 'POST',
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  credentials: 'same-origin',
  body: JSON.stringify(body),
});

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

const filterDb = (db, data) => {
  console.log('calling the api');
  console.log(db, data);
  return flowP([
    http.fetch(databaseFilterUrl(db)),
    resCheck
  ], postMethod(data));
};

const getAnnotations = (data) => {
  console.log('calling the api');
  console.log(data);
  return flowP([
    http.fetch(getAnnotationsUrl),
    resCheck
  ], postMethod(data));
};

export default {
  databases,
  database,
  list,
  filterDb,
  getAnnotations
};
