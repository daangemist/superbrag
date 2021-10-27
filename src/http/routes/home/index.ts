import { Express } from 'express';
import { getBragsRepository } from '../../../db';

export default function (app: Express) {
  app.get('/', async (req, res) => {

    const repository = await getBragsRepository();
    const posts = await repository.getByQuery(
      repository.createQuery()
        .sort('publication', 'desc')
        .eq('published', true)
        .limit(25)
    );

    // @ts-expect-error Dynamic attribute on session.
    res.render('home', { loggedIn: req.session.loggedIn, posts });
  });
}
