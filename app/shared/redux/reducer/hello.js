import {set} from 'lodash/fp';

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
  }
};

const selected = (state = selectedInitial, action) => {
  switch (action.type) {
    case 'SELECT_DATABASE_SUCCESS':
      return set('selectedDatabase', action.payload.result, state);
    case 'FILL_DATABASE_RESULTS':
      return set(`results.${state.selectedDatabase.name}`, action.payload.result, state);
    default:
      return state;
  }
};

export default combineReducers({
  dbs,
  selected
});
