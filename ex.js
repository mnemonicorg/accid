import {size, map, filter, union, uniq, xor, concat} from 'lodash/fp';
import {collectP} from 'dashp';
import {accid, database} from './accid';
import actions from './actions';

// d.database('sy-su').getNode('13f13c297169967aab256b08f9f552b13e5ee409fc544fea79fd44d391f0021a').then(console.log);
//
// console.log('---------------------------------');
// d.database('locations').getNode(1).then(console.log);

//d.database('sy-su').searchTerm('hello').then(size).then(console.log);

//
// const fields = {
//   some: 'random',
//   collection: 'of',
//   fields: 'ahahha',
// };
//
// d.database('accid').updateNode('sy-su', '13b510176e1dd8b9bea63726fcc59d464126cbd9981974820fe574d52201f72d', fields)
// .then(console.log)
//{aid}

// const fromid = 'f8b94d60bf869603e2f02d3f697ecac197cee74d2d30b69477baa919a652ea51';
//
// const sug = database('sy-su');
// const loc = database('locations');
//
//
// //sug.list().then(console.log);
//
// loc.list().then(console.log);
//




const args = {
  spreadsheet: '1_TUox7KjP69F-Nx3Fc4b1kJWrwzfZNSYJFP6zSveN8w',
  sheet: 'Task2'
};

const args2 = {
  spreadsheet: '1_TUox7KjP69F-Nx3Fc4b1kJWrwzfZNSYJFP6zSveN8w',
  sheet: 'Task4'
}

const args3 = {
  spreadsheet: '1_TUox7KjP69F-Nx3Fc4b1kJWrwzfZNSYJFP6zSveN8w',
  sheet: 'Videos from Medical_facilities_Database'
}



const args4 = {
  spreadsheet: '1EtPBNRsRKaSqMsDAOaS0M23jUH8YbIjuhE4PNRnUFCc',
  sheet: 'MOD 1'
}

const args5 = {
  spreadsheet: '1EtPBNRsRKaSqMsDAOaS0M23jUH8YbIjuhE4PNRnUFCc',
  sheet: 'MOD 2'
}

const args6 = {
  spreadsheet: '1EtPBNRsRKaSqMsDAOaS0M23jUH8YbIjuhE4PNRnUFCc',
  sheet: 'MOD 3'
}

const args7 = {
  spreadsheet: '1gmRcnqxfqy7yLdLVkAKCZH_Xg3tEJkT8IIQw_xbF5Gs',
  sheet: 'Task 1'
}

const args8 = {
  spreadsheet: '1OFOllsPszS2E4ML_aPfKrqroyWK3LN1DTK9180uPAH0',
  sheet: 'Task 3'
}

let totalva = [];
let totalra = [];

const importru = collectP(
  (ars) => {
    console.log(ars);
    return actions['import_sheet'](ars)
      .then(filter(u => (u.cid.verified === true || u.cid.verified === 'TRUE')))
      .then(us => {
        totalva = concat(totalva, map('_sc_id_hash', us));
        totalra = concat(totalra, map('_sc_id_hash',
          filter(u =>
            u.cid.collections.includes('Russian airstrikes in Syria')
          )(us)))
        totalra = concat(totalra, map('_sc_id_hash',
          filter(u =>
            u.cid.collections.includes('Civilian casualties as a result of alleged russian attacks')
        )(us)))
        totalva = uniq(totalva);
        totalra = uniq(totalra);

        console.log('total verified videos', size(us));
        console.log('verified videos in ru collection 1',
          size(
            filter(u =>
              u.cid.collections.includes('Civilian casualties as a result of alleged russian attacks')
            ,)(us)
          )
        );
        console.log('verified videos in ru collection 2',
          size(
            filter(u =>
              u.cid.collections.includes('Russian airstrikes in Syria')
            ,)(us)
          )
        );
        console.log('totalv ', size(totalva));
        console.log('totalr ', size(totalra));
        return us;
      })
      .then(map(u => ({
        db: 'sy-su',
        id: u._sc_id_hash,
        annotations: u.cid
      })))
      .then(accid.set)

      .catch(console.log);
  });

importru([args5, args6, args, args2, args3, args4, args7, args8]).then(() => {
  console.log(xor(totalva, totalra));
  console.log('oooop');
  return 'poop';
});


//
// actions['import_old_sc']();
// Civilian casualties as a result of alleged russian attacks
//

//
// //
// accid.get({db: 'collections', id: 'Civilian casualties as a result of alleged russian attacks'})
//   .then(async r => {
//     console.log(r);
//     console.log("here");
//     const r2 = await accid.get({db: 'collections', id: 'Russian airstrikes in Syria'});
//     const todo = union(r.cluster, r2.cluster);
//     console.log(todo);
//     console.log("upah");
//     return accid.get(todo);
//   })
//   .then(r => {
//     const ars = {
//       spreadsheet: '1aKT8g06LieBQo2QLqbABSVVKuRg9k4-dFsyU0-euxqI',
//       data: r
//     }
//     return actions['export_sheet'](ars);
//   })
//   .catch(console.log);

// const l = {
//   aid: '41a8714fe9f1c0d2c9b1362d4f62dd4f3a84941da5a6bc1c033af6ce9077ca58'
// }
// accid.get([l]).then(console.log);

//
//
//
//
//
//
//
// const u = {
//   aid: 'bbdd6cac3adc7fb00711790a28e3e0f66236e65c749a9702012d2c7f5bdb9d50',
//   db: 'arghhhhqqqqqqqqqqqqqqqqqqqqqqq',
//   id: 4,
//   fields: {
//     aaa: 'fuuuuuckkkkkk',
//     sup: 'nahhh',
//     newwwwww: 'spaceleak',
//     thisisafield: 'some other field haha',
//     onemore: 5
//   },
//   cluster: ['sumthn', 'uuuuuuuuu', 'geeeeerrrrrr']
// };
//
// const unU = {
//   aid: 'bbdd6cac3adc7fb00711790a28e3e0f66236e65c749a9702012d2c7f5bdb9d50',
//   db: 'arghhhhqqqqqqqqqqqqqqqqqqqqqqq',
//   id: 4,
//   fields: {aaa: undefined, sup: 'aha!'},
//   cluster: ['sumthn', 'uuuuuuuuu']
// };
//
// const uu = {
//   aid: 'jjj',
//   fields: {jjj: 'ai ai ai ', eee: 'aaaaaaaaaaaaa'}
// }
//
// const us = [
//   u,
//   uu
// ]
//
// const usbydb = {db: 'wheeeeeeeeeeeeeeeeee', id: 4, fields: {newfield: 'ooo', another: 'aaa'}};
//
// const uscompact = ['xxx', 'jjj']
//
// accid.set(us)
//   .then(console.log)
//   .then(() => accid.unset(unU))
//   .then(console.log)
//   .then(() => accid.get('jjj'))
//   .then(console.log)
//   .then(() => accid.get('hey'));
// //accid.unset(unU);
// accid.get('hey');
