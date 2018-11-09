import 'isomorphic-fetch';
import { createAction } from 'redux-actions';
import api from '../../api';

const getDbsRequest = createAction('GET_DATABASES_REQUEST');
const getDbsSuccess = createAction('GET_DATABASES_SUCCESS');
const getDbsFailure = createAction('GET_DATABASES_FAILURE');

const selectDbRequest = createAction('SELECT_DATABASE_REQUEST');
const selectDbSuccess = createAction('SELECT_DATABASE_SUCCESS');
const selectDbFailure = createAction('SELECT_DATABASE_FAILURE');

const fillDbResults = createAction('FILL_DATABASE_RESULTS');


export const getDbs = (dispatch) => {
  // console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
  // console.log(dispatch);
  dispatch(getDbsRequest());
  return api.databases()
    .then((data) => {
      console.log(data);
      if (!data) throw Error('No message received');
      return dispatch(getDbsSuccess(data));
    })
    .catch(() => {
      dispatch(getDbsFailure());
    });
};

export const selectDb = (dbName) =>
  (dispatch) => {
    dispatch(selectDbRequest());
    return api.database(dbName)
      .then(d => dispatch(selectDbSuccess(d)))
      .catch(() => dispatch(selectDbFailure()));
  };

export const filterDb = (dbName, filters) =>
  (dispatch) => {
    console.log('redux action filter db');
    console.log(dbName, filters);
    return api.filter(dbName, filters)
      .then(d => dispatch(fillDbResults(d)))
      .catch(() => dispatch(selectDbFailure()));
  };

export const listDb = (dbName) =>
  (dispatch) => {
    console.log('list db');
    return api.list(dbName)
      .then(d => dispatch(fillDbResults(d)))
      .catch(() => dispatch(selectDbFailure()));
  };


export default {
  getDbs
};
