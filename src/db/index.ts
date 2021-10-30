import { Repository, SuperSave } from 'supersave';
import { Express, Request, Response } from 'express';
import { DB_TABLE_BRAG } from '../constants';
import { Brag } from '../types';
import internalInitialize from './initialize';
import { getConfig } from '../config';

let dbPromise: Promise<SuperSave>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onlyGet = (req: Request, res: Response, next: any) => {
  if (req.method !== 'GET') {
    res.status(401).json({ message: 'Not allowed.' });
    return;
  }
  next();
};

export async function initialize(app?: Express) {
  dbPromise = internalInitialize(
    getConfig().connectionString,
    typeof app !== 'undefined'
  );

  if (app) {
    const superSave = await dbPromise;
    app.use('/api', onlyGet, await superSave.getRouter('/api'));
  }
}

export default (): Promise<SuperSave> => dbPromise;

export const getBragsRepository = async (): Promise<Repository<Brag>> => {
  const initializedDb = await dbPromise;
  return initializedDb.getRepository<Brag>(DB_TABLE_BRAG);
};
