import {find} from 'lodash/fp';
import users from './users.json';

export const findOne = user => find(u => u.username === user.username)(users);

export const verifyPassword = (user, password) => password === users[user.id].password_hash;


export default {
  findOne,
  verifyPassword
};
