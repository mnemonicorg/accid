import {set, includes} from 'lodash/fp';

import {
  combineReducers
} from 'redux';


// eslint-disable-next-line
const dbsInitial = {
  databases: [],
};

const dbs = (state = dbsInitial, action) => {
  switch (action.type) {
    case 'GET_DATABASES_SUCCESS':
      return set('databases', action.payload.result, state);
    default:
      return state;
  }
};

const selectedInitial = {
  databases: [],
  selectedDatabase: {},
  // results keyed by selected database name
  results: {
    // db1: []
    // sy-su: []
  },
  annotations: {
  },
  filterValues: {
  },
};

const selected = (state = selectedInitial, action) => {
  switch (action.type) {
    case 'SELECT_DATABASE_SUCCESS':
      return set('selectedDatabase', action.payload.result, state);
    case 'UPDATE_FILTERS':
      return set(`filterValues.${action.payload[0]}`, action.payload[1], state);
    case 'FILL_DATABASE_RESULTS':
      return set(`results.${state.selectedDatabase.name}`, action.payload.result, state);
    default:
      return state;
  }
};

const updateInitial = {
  update: false,
};

const updatingActions = ['UPDATE_STATUS_REQUEST', 'GET_DATABASES_REQUEST', 'SELECT_DATABASE_REQUEST', 'UPDATE_FILTERS'];
const successActions = ['GET_DATABASES_SUCCESS', 'SELECT_DATABASE_SUCCESS', 'FILL_DATABASE_RESULTS', 'UPDATE_STATUS_SUCCESS'];
const failureActions = ['GET_DATABASES_FAILURE', 'SELECT_DATABASE_FAILURE', 'FILL_DATABASE_FAILURE', 'UPDATE_STATUS_FAILURE'];

const update = (state = updateInitial, action) => {
  if (includes(action, updatingActions)) return set('update', action.payload.result, state);
  if (includes(action, successActions)) return set('update', false, state);
  if (includes(action, failureActions)) return set('update', false, state);
  return state;
};


export default combineReducers({
  dbs,
  selected,
  update
});
