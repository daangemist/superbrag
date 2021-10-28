import { Request, Response } from 'express';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
