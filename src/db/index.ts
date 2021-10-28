import { Repository, SuperSave } from 'supersave';
import { Express } from 'express';
import { DB_TABLE_BRAG } from '../constants';
import { Brag } from '../types';
import internalInitialize from './initialize';

let dbPromise: Promise<SuperSave>;

export async function initialize(app?: Express) {
  const connectionString = process.env.DB ?? 'sqlite://db.sqlite';
  dbPromise = internalInitialize(connectionString, typeof app !== 'undefined');

  if (app) {
    const superSave = await dbPromise;
    app.use('/api', await superSave.getRouter('/api'));
  }
}

export default (): Promise<SuperSave> => dbPromise;

export const getBragsRepository = async (): Promise<Repository<Brag>> => {
  const initializedDb = await dbPromise;
  return initializedDb.getRepository<Brag>(DB_TABLE_BRAG);
}
