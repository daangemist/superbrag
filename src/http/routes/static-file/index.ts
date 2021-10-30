import { Request, Response } from 'express';

export const staticFile =
  (file: string) =>
  (_req: Request, res: Response): void => {
    res.sendFile(file, (err) => {
      if (err) {
        console.log('Cannot find file', file);
        res.status(404).send('Not Found');
      }
    });
  };
