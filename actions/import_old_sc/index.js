import Promise from 'bluebird';
import {size} from 'lodash/fp';
import mongomap from '../helpers/mongomap';
import {accid} from '../../accid';

const mongoconnection = 'mongodb://127.0.0.1:27017';

const processResults = is => {
  console.log(size(is));
  return Promise.resolve(2); // eslint-disable-line
};


const query = { $or: [{'cid.verified': 'TRUE' }, {'cid.verified': true}] };

const eachfunc = i => {
  console.log(i._sc_id_hash);
  const a = {
    db: 'sy-su',
    id: i._sc_id_hash,
    annotations: i.cid
  };
  // console.log('cid ', i.cid.filename);
  // console.log('loc ', i._sc_downloads[0].location);
  // console.log('legacy ', i._sc_downloads[0].legacyLocation);
  // console.log('legacy ', i.legacy_location);

  return accid.set(a)
    .then((r) => { return Promise.resolve(i); }) // eslint-disable-line
};

const action = async () => {
  const t = await mongomap(mongoconnection, 'sugarcube', 'units', query, processResults, eachfunc, false);
  console.log(t);
  console.log('aa');
};

export default action;
