import { Express } from 'express';
import { COOKIE_NAME } from '../../middleware/logged-in';

export function logout(app: Express) {
  app.get('/logout', (_req, res) => {
    res.clearCookie(COOKIE_NAME);
    res.redirect('/');
  })
}
