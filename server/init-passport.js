import LocalStrategy from 'passport-local';
import { findOne } from './users';

const initPassport = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.username);
  });

  passport.deserializeUser((username, done) => {
    const u = {username};
    const user = findOne(u);
    if (!user) throw new Error('user not found!');
    return done(null, user);
  });

  passport.use('local', new LocalStrategy(
    (username, password, done) => {
      const user = {username, password};
      console.log(user);
      return done(null, user);
    }
  ));
};

export default initPassport;
