import { Request, Response } from 'express';

export const loggedIn = (req: Request, res: Response, next: any) => {
  if (req.path === '/login') {
    next();
    return;
  }

  // @ts-expect-error Dynamic session value.
  if (!req.session.loggedIn) {
    res.redirect('/login');
  }
  next();
};
