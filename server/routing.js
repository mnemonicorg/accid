export default (app, passport) => {
  app.get('/', isLoggedIn, (req, res) => {
    res.send('hellow');
  });

  app.get('/login', (req, res) => {
    // res.sendFile(path.join(__dirname, '../public', 'index1.html'));
    res.sendFile('/log.html', { root : __dirname});
  });

  app.get('/profile', isLoggedIn, (req, res) => {
    res.sendFile('/profile.html', { root : __dirname});
  });

  app.post('/login', passport.authenticate('local', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    // failureFlash: true // allow flash messages
  }));

  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
};
