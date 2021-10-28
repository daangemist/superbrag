import { Express } from 'express';
import { getConfig } from '../../../config';
import { getBragsRepository } from '../../../db';

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

    res.render('home', {
      // @ts-expect-error Dynamic attribute on session.
      loggedIn: req.session.loggedIn,
      brags: brags.slice(0, PAGE_SIZE),
      config: getConfig(),
      nextOffset,
      firstPage,
    });
  });
}
