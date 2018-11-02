export default (app, passport) => {
  app.get('/', (req, res) => {
    res.send('hellow');
  });

  app.get('/login', (req, res) => {
    // res.sendFile(path.join(__dirname, '../public', 'index1.html'));
    res.sendFile('/log.html', { root : __dirname});
  });

  app.post('/login', passport.authenticate('local', {
    successRedirect: '/', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    // failureFlash: true // allow flash messages
  }));
};
