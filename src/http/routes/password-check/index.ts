import { Express } from 'express';
import { getConfig } from '../../../config';

export default (app: Express) =>
  app.post('/login', (req, res) => {
    const { accessPassword } = getConfig();
    if (!accessPassword) {
      console.log('Password is not configured, not logging in.');
      res.redirect('/login?error=1');
      return;
    }

    const providedPassword = req.body.password;
    if (providedPassword !== accessPassword) {
      console.log('Passwords did not match.');
      res.redirect('/login?error=1');
      return;
    }

    // @ts-expect-error Dynamic value on session.
    req.session.loggedIn = true;

    res.redirect('/');
  });
