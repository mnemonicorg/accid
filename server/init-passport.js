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
      const validPassword = validatePassword({username, password});
      // const user = {username, password};
      console.log(user);
      if (!user) throw new Error('user not found!');
      if (!validPassword) throw new Error('password is wrong!');
      return done(null, user);
    }
  ));
};

export default initPassport;
