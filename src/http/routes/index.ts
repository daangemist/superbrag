import express from 'express';
import passwordCheck from './password-check';
import bragsCreate from './brags-create';
import home from './home';

export default function (app: express.Express) {
  app.use('/assets', express.static('assets'));
  app.use('/uploads', express.static('uploads'));

  // GET: home
  home(app);

  app.get('/login/', (req, res) => {
    res.render('login', {
      title: 'Login ',
      error: typeof req.query.error !== 'undefined',
    });
  });

  // POST: /login
  passwordCheck(app);

  // POST: /brags/create
  bragsCreate(app);
}
