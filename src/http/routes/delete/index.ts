import { Request, Express, Response } from "express";
import { getBragsRepository } from "../../../db";
import { loggedIn } from "../../middleware";

export const bragDeleteForm = (app: Express) => app.get('/brags/:id/delete', loggedIn, async (req: Request, res: Response) => {
  const bragRepository = await getBragsRepository();

  const brag = await bragRepository.getById(req.params.id || '');
  if (!brag) {
    res.redirect('/');
    return;
  }

  res.render('brag-delete', { brag });
});

export const bragDelete = (app: Express) => app.post('/brags/:id/delete', loggedIn, async (req: Request, res: Response) => {
  const bragRepository = await getBragsRepository();

  const brag = await bragRepository.getById(req.params.id || '');
  if (!brag) {
    console.log('Brag to delete not found.', req.params.id);
    res.redirect('/');
    return;
  }

  await bragRepository.deleteUsingId(brag.id);
  res.redirect('/');
});
