import { SuperSave } from 'supersave';
import { DB_TABLE_BRAG } from '../constants';

export default async (connectionString: string) => {
  const superSave = await SuperSave.create(connectionString);

  await superSave.addEntity({
    name: DB_TABLE_BRAG,
    template: {
      published: false,
    },
    filterSortFields: {
      publication: 'number',
      published: 'boolean',
    },
    relations: [],
  });

  return superSave;
};
