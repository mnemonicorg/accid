import {size, map, filter, union, uniq, xor, concat, omit, compact, getOr, flatMap, each, take, without, difference} from 'lodash/fp';
import {collectP} from 'dashp';
import fs from 'fs';
import {promisify} from 'util';

import {accid, database} from './accid';
import actions from './actions';

const writeFile = promisify(fs.writeFile);

//
//
// accid.get('879b500fe637bb96222ff9fb03c75b0c3abce464ec3200697d9ba194da19ea83')
// .then(i => console.log(i.clusters))
// .catch(console.log)
//

// //

//
// //
// //
// const generateRussianSheets = collection => {
//   console.log('generating sheet for');
//   console.log(collection);
//
//   return accid.get({db: 'collections', id: collection})
//     .then(r => accid.get(r.cluster))
//     .then(async r => {
//       console.log('size of package', size(r));
//       console.log(r[0]);
//
//       const obs = filter(u => (u.annotations.public === true && u.db === 'sy-su'))(r);
//       const ins = filter(u => (u.annotations.public === true && u.db === 'incidents'))(r);
//
//       const ars = {
//         spreadsheet: '1k0JnXwdgqtj0hxKgqnNeW0fYery7KzS6aii7pjgCros',
//         data: obs
//       }
//       const ars2 = {
//         spreadsheet: '1k0JnXwdgqtj0hxKgqnNeW0fYery7KzS6aii7pjgCros',
//         data: ins
//       }
//       const s1 = await actions['export_sheet'](ars);
//       const s2 = await actions['export_sheet'](ars2);
//       return [s1, s2];
//     })
//     .catch(console.log);
// }
//
//
// generateRussianSheets('Russian airstrikes in Syria').catch(console.log);
// generateRussianSheets('Attacks claimed by Russian Ministry of Defense').catch(console.log);
// //
// //
//
//


// Attack against school
// Attack against mosques


//
// accid.get({db: 'collections', id: 'Attack against mosques'})
//     .then(r => accid.unset(r))
//     .catch(console.log);
//



//
//












//
// const ars = {
//   spreadsheet: '1k0JnXwdgqtj0hxKgqnNeW0fYery7KzS6aii7pjgCros',
//   sheet: 'SA INCIDENTSS'
// };
//
//
// actions['import_sheet'](ars)
//   .then(r => {
//     console.log(r[0]);
//     const t = map(i => ({
//       aid: i.aid,
//       db: i.db,
//       id: i.id,
//       annotations: {
//         incident_date: i.annotations.incident_date,
//       },
//       remove: i.remove,
//       clusters: {
//         locations: i.clusters.locations
//       }
//     }))(compact(r));
//     return t;
//   })
//   .then(accid.set)
//   // .then(() => accid.get('e7fc8490ae7d7fca32af1f2e86eefbe8cced2b579ce9f3c63f0b3f7dfbc6f58c'))
//   // .then(console.log)
//   .catch(console.log);
// //
// //

// //
// // //
// // //
//
//
//
//



// CHANGE COLLECTION NAME


//
// accid.get({db: 'collections', id: 'Attacks against civilians'})
//   .then(r => accid.get(r.cluster))
//   .then(async r => {
//     console.log('size of package', size(r));
//     console.log(r[0].clusters.collections);
//
//     // const ars = {
//     //   spreadsheet: '1aKT8g06LieBQo2QLqbABSVVKuRg9k4-dFsyU0-euxqI',
//     //   data: r
//     // }
//     // return actions['export_sheet'](ars);
//     // const os = map(i => ({
//     //   aid: i.aid,
//     //   id: i.id,
//     //   db: i.db,
//     //   remove: {
//     //     collections: ['Attacks against civilians']
//     //   },
//     //   clusters: {
//     //     collections: ['Attacks on other civilian infrastructure']
//     //   }
//     // }), r);
//     // console.log(os);
//     // const obs = await accid.set(os);
//     // //
//     // console.log(obs);
//     return '';
//   })
//   .catch(console.log);
//
//






















// accid.get({db: 'collections', id: 'Civilian casualties as a result of alleged russian attacks'})
//   .then(async r => {
//     const r2 = await accid.get({db: 'collections', id: 'Russian airstrikes in Syria'});
//     // const r3 = await accid.get({db: 'collections', id: 'Attacks claimed by Russian Ministry of Defense'});
//     const todo = union(r.cluster, r2.cluster);
//     // const todo = r3.cluster;
//     return accid.get(todo);
//   })
//   .then(r => {
//     console.log('size of package', size(r));
//     console.log(r[0]);
//     return r;
//   })
//   .then(filter(u => u.db === 'sy-su'))
//   .then(async r => {
//     console.log('size of package', size(r));
//     console.log(r[0]);
//
//     // const ars = {
//     //   spreadsheet: '1aKT8g06LieBQo2QLqbABSVVKuRg9k4-dFsyU0-euxqI',
//     //   data: r
//     // }
//     // return actions['export_sheet'](ars);
//     const i = map(ii => ({
//       aid: ii.aid,
//       id: ii.id,
//       db: ii.db,
//       clusters: {
//         collections: ['Russian airstrikes in Syria']
//       }
//     }), r);
//
//     const is = await accid.set(i);
//
//     console.log(is);
//     return '';
//   })
//   .catch(console.log);







//
// const args = {
//   spreadsheet: '1n2L3xyfLmrJm2LoC68uRocx08CoBGWcuX8hBm4VZm_A',
//   sheet: 'Incidents Master'
// };
//
// const args2 = {
//   spreadsheet: '1RGiOkKbE6E9tYdy4_ooPrr_QJZ8kpSJaAXd0DMkWwAs',
//   sheet: 'Incidents Master ( Syrian Archive )'
// }
//
// const args3 = {
//   spreadsheet: '1RGiOkKbE6E9tYdy4_ooPrr_QJZ8kpSJaAXd0DMkWwAs',
//   sheet: 'Incidents Master ( Russian )'
// }
//
//
// const importruINCIDENTS = collectP(
//   (ars) => {
//     return actions['import_sheet'](ars)
//       .then(us => {
//         console.log(ars);
//         console.log('total incidents videos', size(us));
//         console.log(us[0]);
//         return us;
//       })
//       .then(map(u => {
//         return {
//           db: 'incidents',
//           id: u.id,
//           annotations: u.annotations,
//           clusters: u.clusters
//         };
//       }))
//       .then(us => {
//         console.log(us[0]);
//         console.log(size(us));
//         return us;
//       })
//       .then(accid.set)
//       .catch(console.log);
//   });
//
// importruINCIDENTS([args]);
// //
//
// //








// accid.findMany({db: 'incidents'})
//   .then(map('aid'))
//   .then(accid.get)
//   .then(map(i => ({
//     aid: i.aid,
//     id: i.id,
//     db: i.db,
//     annotations: {
//       verified: true,
//       relevant: true,
//       public: true,
//     }
//   })))
//   .then(accid.set)
//   .then(console.log)
//   .catch(console.log);



console.time('aaa');
accid.findMany({db: 'incidents'})
  .then(map('aid'))
  .then(accid.get)
  .then(filter(x => x.annotations.public === true))
  .then(async r => {
    console.timeEnd('aaa');
     console.log(r[0]);
     console.log('size of package', size(r));
     console.log(r[0]);
     const wf = await writeFile('incidents.json', JSON.stringify(r));
     console.log(wf);
     return 'hey';
   })
  .then(console.log)
  .catch(console.log)







// import n from './new.json';
// import o from './old.json';
//
// const nn = map('id')(n);
// const oo = map('id')(o);
//
// console.log(size(nn));
// console.log(size(oo));
//
// console.log(size(uniq(nn)));
// console.log(size(uniq(oo)));
//
// console.log(xor(nn, oo));
//
// let p = oo;
// each(q => {
//   const index = p.indexOf(q);
//   if (index > -1) {
//     p.splice(index, 1);
//   }
// })(uniq(oo));
// console.log(p);
//
//
//
//
//


//
//

// const args = {
//   spreadsheet: '1_TUox7KjP69F-Nx3Fc4b1kJWrwzfZNSYJFP6zSveN8w',
//   sheet: 'Task2'
// };
//
// const args2 = {
//   spreadsheet: '1_TUox7KjP69F-Nx3Fc4b1kJWrwzfZNSYJFP6zSveN8w',
//   sheet: 'Task4'
// }
//
// const args3 = {
//   spreadsheet: '1_TUox7KjP69F-Nx3Fc4b1kJWrwzfZNSYJFP6zSveN8w',
//   sheet: 'Videos from Medical_facilities_Database'
// }
//
//
//
// const args4 = {
//   spreadsheet: '1EtPBNRsRKaSqMsDAOaS0M23jUH8YbIjuhE4PNRnUFCc',
//   sheet: 'MOD 1'
// }
//
// const args5 = {
//   spreadsheet: '1EtPBNRsRKaSqMsDAOaS0M23jUH8YbIjuhE4PNRnUFCc',
//   sheet: 'MOD 2'
// }
//
// const args6 = {
//   spreadsheet: '1EtPBNRsRKaSqMsDAOaS0M23jUH8YbIjuhE4PNRnUFCc',
//   sheet: 'MOD 3'
// }
//
// const args7 = {
//   spreadsheet: '1gmRcnqxfqy7yLdLVkAKCZH_Xg3tEJkT8IIQw_xbF5Gs',
//   sheet: 'Task 1'
// }
//
// const args8 = {
//   spreadsheet: '1OFOllsPszS2E4ML_aPfKrqroyWK3LN1DTK9180uPAH0',
//   sheet: 'Task 3'
// }
//
// let totalva = [];
// let totalra = [];
//
// const fuckups = [
//   '2f6ffb6da958be8621934a347288166bb687c06c16068ba7ead2ebf3572e742c',
//   '3dba4810276ff27da9a754424b4909d546f42c2d8346ccd001a7674a6ed298e5',
//   '3dba4810276ff27da9a754424b4909d546f42c2d8346ccd001a7674a6ed298e5',
//   '8e519d361a89e2d036c3df11e36717972732ecea22a815a180aed90c4892c865',
// ];
//
// const importru = collectP(
//   (ars) => {
//     console.log(ars);
//     return actions['import_sheet'](ars)
//       .then(filter(u => (u.cid.verified === true || u.cid.verified === 'TRUE')))
//       .then(us => {
//
//         totalva = concat(totalva, map('_sc_id_hash', us));
//         totalra = concat(totalra, map('_sc_id_hash',
//           filter(u =>
//             u.cid.collections.includes('Russian airstrikes in Syria')
//           )(us)))
//         totalra = concat(totalra, map('_sc_id_hash',
//           filter(u =>
//             u.cid.collections.includes('Civilian casualties as a result of alleged russian attacks')
//         )(us)))
//         totalva = uniq(totalva);
//         totalra = uniq(totalra);
//
//         console.log('total verified videos', size(us));
//         console.log('verified videos in ru collection 1',
//           size(
//             filter(u =>
//               u.cid.collections.includes('Civilian casualties as a result of alleged russian attacks')
//             ,)(us)
//           )
//         );
//         console.log('verified videos in ru collection 2',
//           size(
//             filter(u =>
//               u.cid.collections.includes('Russian airstrikes in Syria')
//             ,)(us)
//           )
//         );
//         console.log('totalv ', size(totalva));
//         console.log('totalr ', size(totalra));
//         return us;
//       })
//       .then(map(u => {
//         if (fuckups.includes(u._sc_id_hash)){
//           console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaa');
//           console.log(u.cid.incident_code);
//           console.log(u._sc_id_hash);
//           console.log(u);
//           console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
//         }
//         return {
//           db: 'sy-su',
//           id: u._sc_id_hash,
//           annotations: u.cid
//         };
//       }))
//       .then(accid.set)
//       .catch(console.log);
//   });
//
// importru([args2]).then(() => {
//   console.log(xor(totalva, totalra));
//   console.log('oooop');
//   return 'poop';
// });


//
// actions['import_old_sc']();
// Civilian casualties as a result of alleged russian attacks
//








//
//














// const l = {
//   aid: 'e7329a9a396e426fd37df4b21302ad44594d6003dfead3c29774c06ac363908a'
// }
// accid.get([l]).then(console.log);
//
// //
// //
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
