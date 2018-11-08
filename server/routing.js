import express from 'express';


import apiroutes from '../api/routes';
import approutes from '../app/routes';

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect(`/login?next=${req.originalUrl}`);
}

const router = express.Router();


export default (passport) => {
  router.use('/api', isLoggedIn, apiroutes);

  // router.get('/', isLoggedIn, (req, res) => {
  //   res.send('hellow');
  // });

  router.get('/login', (req, res) => {
    // res.sendFile(path.join(__dirname, '../public', 'index1.html'));
    res.sendFile('/log.html', {root: __dirname});
  });

  router.get('/profile', isLoggedIn, (req, res) => {
    res.sendFile('/profile.html', {root: __dirname});
  });

  router.post('/login', (req, res, next) => { // eslint-disable-line
    return passport.authenticate('local', {
      successRedirect: req.query.next || '/aaaa', // redirect to the secure profile section
      failureRedirect: '/login', // redirect back to the signup page if there is an error
      // failureFlash: true // allow flash messages
    })(req, res, next);
  });

  router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  router.use('*', isLoggedIn, approutes);


  return router;
};
