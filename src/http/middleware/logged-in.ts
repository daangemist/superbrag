import { Request, Response } from 'express';
import { verify } from '../../auth';

export const COOKIE_NAME = 'superbrag-auth';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loggedIn = (req: Request, res: Response, next: any) => {
  if (req.path === '/login') {
    next();
    return;
  }

  const token = req.cookies[COOKIE_NAME];
  if (!verify(token)) {
    res.redirect('/login');
  }
  next();
};
