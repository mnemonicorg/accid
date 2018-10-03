import accidConfig from '../config/accid';
import a from './core';

import database from './databases';

export const accid = a(accidConfig);

// accid api functions
// export const addFields = curry(
//   (db, id, fields) => get(db, id).then(source => accid.push(db, id, source, fields))
// );

export default {
  database,
  accid,
};
