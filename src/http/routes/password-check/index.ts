import { CookieOptions, Express } from 'express';
import add from 'date-fns/add';
import { generate } from '../../../auth';
import { getConfig } from '../../../config';
import { COOKIE_NAME } from '../../middleware/logged-in';

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

    const token = generate();
    const cookieOptions: CookieOptions = {
      secure: getConfig().secureSite,
      httpOnly: true,
      expires: add(new Date(), { days: 60 }),
    };
    if (getConfig().domain) {
      cookieOptions.domain = getConfig().domain;
    }
    res.cookie(COOKIE_NAME, token, cookieOptions).redirect('/');
  });
