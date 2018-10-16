import LocalStrategy from 'passport-local';
import { findOne } from './users';

export const Login = passport => {
  passport.use('login', new LocalStrategy({
    passReqToCallback: true
  },
  (req, username, password, done) => {
    const f = findOne({username, password});
    if (f === undefined) {
      return done(null, false, req.flash('message', 'User Not found.'));
    }
    return done(null, f);
  }
  ));
};

export default Login;
