import mongodb from 'mongodb';
import assert from 'assert';
import Promise from 'bluebird';

const process = (cursor, finalcallback, eachfunc, saveI) => {
  const accumulator = [];

  const fnAction = (item, callback) =>
    eachfunc(item)
      .then(i => {
        accumulator.push(i);
        if (saveI) {
          console.log('saving');
          return saveI(i);
        }
        return Promise.resolve(4); // eslint-disable-line
      })
      .then(() => callback());


  const fn = (err, item) => {
    if (err || !item) {
      return finalcallback(accumulator);
    }

    setImmediate(fnAction, item, () => {
      cursor.next(fn);
    });
  };

  cursor.next(fn);
};

const mongomap = (
  mongoconnection, database, collection, query, processfunc, eachfunc, save = false
) => {
  mongodb.MongoClient.connect(mongoconnection, (er, client) => {
    assert.equal(null, er);

    const db = client.db(database);
    const cursor = db.collection(collection).find(query);

    const saveI = i =>
      db
        .collection(collection)
        .updateOne(
          {_id: i._id},
          i
        );

    const finished = result => {
      processfunc(result)
        .then(() => client.close())
        .catch(() => console.log('big error'));
    };

    if (save) {
      return process(cursor, finished, eachfunc, saveI);
    }
    return process(cursor, finished, eachfunc);
  });
};

export default mongomap;
