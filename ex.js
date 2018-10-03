import {size} from 'lodash/fp';
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
//
//
//

// const args = {
//   spreadsheet: '1gmRcnqxfqy7yLdLVkAKCZH_Xg3tEJkT8IIQw_xbF5Gs',
//   sheet: 'Task 1'
// };
//
// actions['import_sc_sheet'](args).then(console.log).catch(console.log);
//
//
//
//

actions['import_old_sc']();

//
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
