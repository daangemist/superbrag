import { SuperSave, EntityDefinition, Collection } from 'supersave';
import { DB_TABLE_BRAG } from '../constants';

const BRAG_DEFINITION: EntityDefinition | Collection = {
  name: DB_TABLE_BRAG,
  template: {
    published: false,
  },
  filterSortFields: {
    publication: 'number',
    published: 'boolean',
  },
  relations: [],
};

export default async (connectionString: string, apiEnabled: boolean) => {
  const superSave = await SuperSave.create(connectionString);

  if (!apiEnabled) {
    await superSave.addEntity(BRAG_DEFINITION);
  } else {
    await superSave.addCollection({
      ...BRAG_DEFINITION,
      hooks: [
        {
          createBefore: (_collection, _req, _res, entity: any) => {
            if (entity.publication) {
              return entity;
            }
            return {
              ...entity,
              publication: Math.floor(new Date().getTime() / 1000),
            };
          },
        },
      ],
    });
  }

  return superSave;
};
