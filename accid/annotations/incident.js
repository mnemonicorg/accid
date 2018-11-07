import {get as loGet, set as loSet} from 'lodash/fp';
import {booleanField, locationClusterField, arrayRemoveClusterField, arrayClusterField, LatLonField} from './fieldtypes';

const fields = {
  clusters: {
    locations: arrayClusterField('locations', 'search_name_ar', () => {}),
    // location: locationClusterField,
    // locationold: locationClusterField,
    collections: arrayClusterField('collections', 'collection', () => {}),
    weapons: arrayClusterField('weapons', 'name', () => {}),
  },
  remove: {
    locations: arrayRemoveClusterField('locations', 'search_name_ar')
  },
  annotations: {
    verified: booleanField,
    public: booleanField,
    relevant: booleanField,
    latitude: LatLonField,
    longitude: LatLonField,
  }
};

export default {
  fields,
};
