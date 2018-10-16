import { Login } from './login';
import { findOne } from './users';

export const initPassport = passport => {
  passport.serializeUser((user, done) => {
    console.log('serializing user: '); console.log(user);
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    // function to excute when deserializeuser
    findOne(id, (err, user) => {
      console.log('deserializing user:', user);
      done(err, user);
    });
  });

  Login(passport);
};

export default initPassport;
