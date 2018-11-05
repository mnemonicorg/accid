import {find} from 'lodash/fp';
import bcrypt from 'bcrypt-nodejs';
import users from './users.json';


export const findOne = user => find(u => u.username === user.username)(users);

// to hash a new password use this method:
// bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

export const validatePassword = user => {
  const u = findOne(user);
  const u_h = u.hashed_password;
  return bcrypt.compareSync(user.password, u_h);
};

export default {
  findOne,
  validatePassword
};
