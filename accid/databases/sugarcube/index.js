import {merge} from 'lodash/fp';
import {getNode, findMany, listNodes} from '../mongodb';

const dbid = '_sc_id_hash';
const collection = 'units';

export const hello = () => console.log('HELLO ITS sugarcube');

export const searchTerm = (term) => ({'snippet.description': new RegExp(term, 'i')});

const constructor = (config) => ({
  getNode: getNode(config.connection, collection, dbid),
  searchTerm: t => findMany(config.connection, collection, searchTerm(t)),
  list: (p = 1) => {
    console.log('query mongo');
    console.time('a');
    return listNodes(config.connection, collection, {}, 100, (p-1)*100 ).then(d => {
       const y = console.timeEnd('a');
       console.log(y);
       console.log('done query mongo');
       return d;
    })
  },
  id_key: dbid,
  hello,
})

const configValues = {
  config: [
    {
      value: 'connection',
      desc: 'the mongodb connection string'
    }
  ],
  functions: ['searchTerm', 'getNode', 'list']
}
export default (config) => merge(constructor(config), configValues);
