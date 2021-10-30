import express from 'express';
import path from 'path';
import passwordCheck from './password-check';
import bragsCreate from './brags-create';
import home from './home';
import { logout } from './logout';
import { staticFile } from './static-file';
import { allowList } from '../middleware/allow-list';
import { bragDelete, bragDeleteForm } from './delete';

export default function (app: express.Express) {
  // default paths
  app.use('/assets', express.static('assets'));
  app.use('/uploads', express.static('uploads'));
  app.get(
    '/favicon.ico',
    staticFile(path.join(__dirname, '../../../assets/favicon/favicon.ico'))
  );
  app.get(
    '/manifest.json',
    staticFile(path.join(__dirname, '../../../assets/favicon/site.webmanifest'))
  );

  // GET: home
  home(app);

  // GET: /logout
  logout(app);

  app.use('/login', allowList);
  app.get('/login', (req, res) => {
    res.render('login', {
      title: 'Login ',
      error: typeof req.query.error !== 'undefined',
    });
  });

  // POST: /login
  passwordCheck(app);

  // POST: /brags/create
  bragsCreate(app);

  // GET: /brags/:id/delete
  bragDeleteForm(app);
  // POST: /brags/:id/delete
  bragDelete(app);
}
