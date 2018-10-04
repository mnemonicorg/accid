import {size, map, filter} from 'lodash/fp';
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
//
//
//
//
const args = {
  spreadsheet: '1gmRcnqxfqy7yLdLVkAKCZH_Xg3tEJkT8IIQw_xbF5Gs',
  sheet: 'Task 1'
};

const args2 = {
  spreadsheet: '1OFOllsPszS2E4ML_aPfKrqroyWK3LN1DTK9180uPAH0',
  sheet: 'Task 3'
}


const args3 = {
  spreadsheet: '1_TUox7KjP69F-Nx3Fc4b1kJWrwzfZNSYJFP6zSveN8w',
  sheet: '2f0c717895f7f4ceb4df728fad9d1ccc5b71826f'
}

const args4 = {
  spreadsheet: '1_TUox7KjP69F-Nx3Fc4b1kJWrwzfZNSYJFP6zSveN8w',
  sheet: 'a28f5875b04b02c02b8af8c1e5d28ca9eb4f2159'
}

const args5 = {
  spreadsheet: '1_TUox7KjP69F-Nx3Fc4b1kJWrwzfZNSYJFP6zSveN8w',
  sheet: '55ed41a11c142da7ca03291cd45953fe630cedae'
}

const args6 = {
  spreadsheet: '1_TUox7KjP69F-Nx3Fc4b1kJWrwzfZNSYJFP6zSveN8w',
  sheet: 'ae87bb5c5d4b3e42c620a069aa3be221986a1e84'
}

const args7 = {
  spreadsheet: '1_TUox7KjP69F-Nx3Fc4b1kJWrwzfZNSYJFP6zSveN8w',
  sheet: '38ca5cf519da3ecec72e882dfa346d6832485ba9'
}

const args8 = {
  spreadsheet: '1_TUox7KjP69F-Nx3Fc4b1kJWrwzfZNSYJFP6zSveN8w',
  sheet: 'd2166aef18a9899ad7814ad9d92c387c353a091c'
}

const args9 = {
  spreadsheet: '1_TUox7KjP69F-Nx3Fc4b1kJWrwzfZNSYJFP6zSveN8w',
  sheet: '60e9985b6e6b0a9718c44717698e00c52a2e2c56'
}

const args10 = {
  spreadsheet: '1_TUox7KjP69F-Nx3Fc4b1kJWrwzfZNSYJFP6zSveN8w',
  sheet: 'd8354af508c6789e7d817a9edba634bab835e041'
}
const args11 = {
  spreadsheet: '1_TUox7KjP69F-Nx3Fc4b1kJWrwzfZNSYJFP6zSveN8w',
  sheet: 'c1bf49a337632850b46b7a0118fd455e3354f094'
}
const args12 = {
  spreadsheet: '1_TUox7KjP69F-Nx3Fc4b1kJWrwzfZNSYJFP6zSveN8w',
  sheet: 'a7c31d683c5afd55f609307f02d46b9fff243422'
}
const args13 = {
  spreadsheet: '1_TUox7KjP69F-Nx3Fc4b1kJWrwzfZNSYJFP6zSveN8w',
  sheet: '5be03a82c2ddb1a2344b66027592dea047d662d1'
}
const args14 = {
  spreadsheet: '1_TUox7KjP69F-Nx3Fc4b1kJWrwzfZNSYJFP6zSveN8w',
  sheet: 'b073a63cd0536611b88df8404b4b901fddcbab2f'
}
const args15 = {
  spreadsheet: '1_TUox7KjP69F-Nx3Fc4b1kJWrwzfZNSYJFP6zSveN8w',
  sheet: '24ab227f1455bb5f104813df8ce58cc79fb8c892'
}
const args16 = {
  spreadsheet: '1_TUox7KjP69F-Nx3Fc4b1kJWrwzfZNSYJFP6zSveN8w',
  sheet: 'bd23417c079982821b80ba7e8e292d403e9cdde2'
}
const args17 = {
  spreadsheet: '1_TUox7KjP69F-Nx3Fc4b1kJWrwzfZNSYJFP6zSveN8w',
  sheet: '83ff24eccc531ccb34dbc5ed4e42fbd9bc8d3f07'
}
const args18 = {
  spreadsheet: '1_TUox7KjP69F-Nx3Fc4b1kJWrwzfZNSYJFP6zSveN8w',
  sheet: '1e8b41ed9f97f538b3754f9afbff07bd5515f9f0'
}
const args19 = {
  spreadsheet: '1_TUox7KjP69F-Nx3Fc4b1kJWrwzfZNSYJFP6zSveN8w',
  sheet: 'Videos from Medical_facilities_Database'
}
const args20 = {
  spreadsheet: '1_TUox7KjP69F-Nx3Fc4b1kJWrwzfZNSYJFP6zSveN8w',
  sheet: 'Task2'
}

const args21 = {
  spreadsheet: '1EtPBNRsRKaSqMsDAOaS0M23jUH8YbIjuhE4PNRnUFCc',
  sheet: 'MOD 1'
}
const args22 = {
  spreadsheet: '1EtPBNRsRKaSqMsDAOaS0M23jUH8YbIjuhE4PNRnUFCc',
  sheet: 'MOD 2'
}


const importru = collectP(
  (ars) => {
    console.log(ars);
    return actions['import_sc_sheet'](ars)
      .then(filter(u => (u.cid.verified === true || u.cid.verified === 'TRUE')))
      .then(us => {
        console.log('total verified videos', size(us));
        console.log('verified videos in ru collection',
          size(
            filter(u =>
              u.cid.collections.includes('Civilian casualties as a result of alleged russian attacks')
            ,)(us)
          )
        );
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

importru([args, args2, args3, args4, args5, args6, args7, args8, args9, args10, args11, args12, args13, args14, args15, args16, args17, args18, args19, args20, args21, args22]);



actions['import_old_sc']();



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
