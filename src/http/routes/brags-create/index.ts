import { Express } from 'express';
import { getBragsRepository } from '../../../db';
import { loggedIn } from '../../middleware';

export default (app: Express) => {
  app.post('/brags/create', loggedIn, async (req, res) => {
    if (!req.body.contents || !req.body.contents.trim()) {
      res.redirect('/');
      return;
    }

    const bragsRepository = await getBragsRepository();
    await bragsRepository.create({
      body: req.body.contents.trim(),
      publication: Math.round((new Date()).getTime() / 1000),
      published: true,
    });

    res.redirect('/');
  })
}
