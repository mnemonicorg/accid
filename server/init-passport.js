import LocalStrategy from 'passport-local';
import { findOne } from './users';

const initPassport = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.username);
  });

  passport.deserializeUser((username, done) => {
    const u = {username};
    findOne(u, (err, user) => {
      done(err, user);
    });
  });

  passport.use('local', new LocalStrategy({
    passReqToCallback: true
  },
  (req, username, password, done) => {
    const user = {username, password};
    console.log(user);
    return done(null, user);
  }
  ));
};

export default initPassport;
