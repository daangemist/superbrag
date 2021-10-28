import { Express } from 'express';
import exphbs from 'express-handlebars';
import { markdown, relative, date, urlencode } from './helpers';

const hbs = exphbs.create({
  extname: '.hbs',
  helpers: {
    markdown,
    relative,
    date,
    urlencode,
  },
});

export default function (app: Express) {
  app.engine('.hbs', hbs.engine);
  app.set('view engine', 'hbs');
}
