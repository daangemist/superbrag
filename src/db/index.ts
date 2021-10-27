import { Repository, SuperSave } from 'supersave';
import { DB_TABLE_BRAG } from '../constants';
import { Brag } from '../types';
import initialize from './initialize';

const dbPromise = initialize('sqlite://db.sqlite');

export default (): Promise<SuperSave> => dbPromise;

export const getBragsRepository = async (): Promise<Repository<Brag>> => {
  const initializedDb = await dbPromise;
  return initializedDb.getRepository<Brag>(DB_TABLE_BRAG);
}
