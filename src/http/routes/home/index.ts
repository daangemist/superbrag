import { Express } from 'express';
import { verify } from '../../../auth';
import { getConfig } from '../../../config';
import { getBragsRepository } from '../../../db';
import { COOKIE_NAME } from '../../middleware/logged-in';

const PAGE_SIZE = 25;

export default function (app: Express) {
  app.get('/', async (req, res) => {
    const repository = await getBragsRepository();
    const query = repository
      .createQuery()
      .sort('publication', 'desc')
      .eq('published', true)
      .limit(PAGE_SIZE + 1);

    let firstPage = true;
    if (req.query.offset) {
      const afterPublished = parseInt(`${req.query.offset}`);
      if (!isNaN(afterPublished)) {
        query.lt('publication', afterPublished);
        firstPage = false;
      }
    }

    const brags = await repository.getByQuery(query);

    let nextOffset: number | undefined = undefined;
    if (brags.length > PAGE_SIZE) {
      nextOffset = brags[PAGE_SIZE - 1].publication;
    }

    const token = req.cookies[COOKIE_NAME] ?? '';
    res.render('home', {
      loggedIn: token ? verify(token) : false,
      brags: brags.slice(0, PAGE_SIZE),
      config: getConfig(),
      nextOffset,
      firstPage,
    });
  });
}
