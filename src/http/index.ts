import express from 'express';
import routes from './routes';
import session from './session';
import view from './views';

export default function (app: express.Express) {
  app.use(express.urlencoded({ extended: true }));

  // First, initialize the session
  session(app);

  // The handlebars view engine
  view(app);

  // routes
  routes(app);
}
