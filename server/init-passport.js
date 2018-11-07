import LocalStrategy from 'passport-local';
import { findOne, validatePassword } from './users';

const initPassport = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.username);
  });

  passport.deserializeUser((username, done) => {
    const user = findOne({username});
    if (!user) throw new Error('user not found!');
    return done(null, user);
  });

  passport.use('local', new LocalStrategy(
    (username, password, done) => {
      const user = findOne({username, password});
      if (!user) throw new Error('user not found!');
      const validPassword = validatePassword({username, password});
      if (!validPassword) throw new Error('password is wrong!');
      return done(null, user);
    }
  ));
};

export default initPassport;
