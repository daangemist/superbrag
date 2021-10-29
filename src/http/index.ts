import express from 'express';
import cookieParser from 'cookie-parser';
import routes from './routes';
import view from './views';

export default function (app: express.Express) {
  app.disable('x-powered-by');
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  // The handlebars view engine
  view(app);

  // routes
  routes(app);
}
