import { Repository, SuperSave } from 'supersave';
import { Express } from 'express';
import { DB_TABLE_BRAG } from '../constants';
import { Brag } from '../types';
import internalInitialize from './initialize';
import { getConfig } from '../config';

let dbPromise: Promise<SuperSave>;

export async function initialize(app?: Express) {
  dbPromise = internalInitialize(
    getConfig().connectionString,
    typeof app !== 'undefined'
  );

  if (app) {
    const superSave = await dbPromise;
    app.use('/api', await superSave.getRouter('/api'));
  }
}

export default (): Promise<SuperSave> => dbPromise;

export const getBragsRepository = async (): Promise<Repository<Brag>> => {
  const initializedDb = await dbPromise;
  return initializedDb.getRepository<Brag>(DB_TABLE_BRAG);
};
