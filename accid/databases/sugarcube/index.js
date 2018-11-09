import {merge, map, mergeAll, keys, pickBy, identity, isEmpty, size} from 'lodash/fp';
import {getNode, findMany, listNodes} from '../mongodb';

const dbid = '_sc_id_hash';
const collection = 'units';

export const hello = () => console.log('HELLO ITS sugarcube');

export const searchTerm = (term) => ({'snippet.description': new RegExp(term, 'i')});

const constructor = (config) => {

  const filterQueries = {
    source: (src) => ({'_sc_source': src}),
    startDate: (start) => ({
      '_sc_pubdates.source': {
        $gte: start
      }
    }),
    endDate: (end) => ({
      '_sc_pubdates.source': {
        $lte: end
      }
    })
  };

  const filter = (fs) => {
    console.log('SC GOT', fs);
    const ffs = pickBy(identity, fs);
    console.log('ffs', ffs);
    // TODO VALIDATE INPUT
    const filters = keys(ffs);
    const queries = map(f => filterQueries[f](fs[f]))(filters)
    console.log('queries', queries);
    const megaQuery = isEmpty(queries) ? {} : {$and: queries}; // mergeAll(queries);
    console.log('megaquery', megaQuery);

    return findAndPaginate(megaQuery).then(rs => {
      console.log('results based off search');
      console.log(size(rs));
      return rs;
    });
  }

  const findAndPaginate = (query, p = 1) =>
    listNodes(config.connection, collection, query, 100, (p-1)*100 )

  return {
    get: getNode(config.connection, collection, dbid),
    search: t => findMany(config.connection, collection, searchTerm(t)),
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
    filter,
    id_key: dbid,
    hello,
  }
}

const configValues = {
  config: [
    {
      value: 'connection',
      desc: 'the mongodb connection string'
    }
  ],
  functions: ['search', 'get', 'list'],
  filters: {
    source: {
      type: 'str',
      help: 'the source of the thing',
      choices: ['youtube_channel', 'twitter_feed']
    },
    startDate:{
      type: 'date',
      help: 'start date',
    },
    endDate: {
        type: 'date',
        help: 'end date',
    }
  }
}
export default (config) => merge(constructor(config), configValues);
