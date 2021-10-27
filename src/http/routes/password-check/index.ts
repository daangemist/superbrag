import { Express } from 'express';

export default (app: Express) =>
  app.post('/login', (req, res) => {
    const password = process.env.ACCESS_PASSWORD;
    if (!password) {
      console.log('Password is not configured, not logging in.');
      res.redirect('/login?error=1');
      return;
    }

    const providedPassword = req.body.password;
    if (providedPassword !== password) {
      console.log('Passwords did not match.');
      res.redirect('/login?error=1');
      return;
    }

    // @ts-expect-error Dynamic value on session.
    req.session.loggedIn = true;

    res.redirect('/');
  });
