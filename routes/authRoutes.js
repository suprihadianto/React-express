const passport = require('passport');

module.exports = app => {
  app.get('/', (req, res) => {
    res.send({ hi: 'there' });
  });

  app.get(
    '/auth/google/',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }));

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.send(req.user);
  });

  app.get('/api/current_user', (req, res) => {
    // res.send(req.session);
    res.send(req.user);
  });
};
