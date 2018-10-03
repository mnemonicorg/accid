import Promise from 'bluebird';
import mongodb from 'mongodb';
import {curry} from 'lodash/fp';

Promise.promisifyAll(mongodb);

const connector = (connection) =>
  mongodb.MongoClient.connectAsync(connection).disposer(db => db.close());

export const getNode = curry((connection, collection, key, id) =>
  Promise.using(connector(connection), db =>
    db
      .collection(collection)
      .find({[key]: id})
      .limit(1)
      .next(),
  ));

export const listNodes = curry((connection, collection, query, limit, skip) =>
  Promise.using(connector(connection), db =>
    db
      .collection(collection)
      .find(query)
      .sort({_id: -1})
      .skip(skip)
      .limit(limit)
      .toArray()
  ));

export const findMany = curry((connection, collection, query) =>
  Promise.using(connector(connection), db =>
    db
      .collection(collection)
      .find(query)
      .toArray()
  ));

export const upsertOne = curry((connection, coll, query, update) =>
  Promise.using(connector(connection), db =>
    db
      .collection(coll)
      .updateOne(query, update, {upsert: true}),
  ));

export const insertOne = curry((connection, coll, item) =>
  Promise.using(connector(connection), db =>
    db
      .collection(coll)
      .insertOne(item),
  )
);

export const removeOne = curry((connection, coll, query) =>
  Promise.using(connector(connection), db =>
    db
      .collection(coll)
      .deleteOne(query),
  )
);


export default ({connection, collection, key}) => ({
  getNode: getNode(connection, collection, key),
  findMany: findMany(connection, collection),
});

// config values: connection, collection, id_key
