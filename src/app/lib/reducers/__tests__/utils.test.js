import {
  createEntityEntries,
  updateJoinTableState,
  deleteEntityEntries
} from '../utils';

describe('utils', () => {
  let state;
  beforeEach(() => {
    state = { entities: {} };
  });

  describe('createEntityEntries', () => {
    it('should place an entity with its id as a reference into the entities property', () => {
      const entities = [{ id: 1, title: 'asdf' }, { id: 2, title: 'iop' }];
      state = createEntityEntries(state, entities);

      expect(Object.keys(state.entities).length).toEqual(entities.length);
      expect(state.entities['1']).toEqual(entities[0]);
    });

    it('should add new entites to the existing list', () => {
      const firstEntities = [{ id: 1, title: 'asdf' }, { id: 2, title: 'iop' }];
      state = createEntityEntries(state, firstEntities);
      const secondEntities = [{ id: 3, title: 'title' }, { id: 4, title: 'bear' }];
      state = createEntityEntries(state, secondEntities);

      expect(Object.keys(state.entities).length)
        .toEqual(firstEntities.length + secondEntities.length);
    });

    it('should update existing entites with new properties', () => {
      const firstEntities = [{ id: 1, title: 'asdf' }, { id: 2, title: 'iop' }];
      state = createEntityEntries(state, firstEntities);
      const secondEntities = [{ id: 1, title: 'title' }, { id: 2, title: 'bear' }];
      state = createEntityEntries(state, secondEntities);

      expect(state.entities['1']).toEqual(secondEntities[0]);
      expect(state.entities['2']).toEqual(secondEntities[1]);
    });
  });

  describe('updateJoinTableState', () => {
    it('should add the primary key as an attribute of entities, which holds an array of foreign keys', () => {
      const pk = 1;
      const fks = [1, 2, 3];
      state = updateJoinTableState(state, pk, fks);

      expect(state.entities[pk]).toEqual(fks);
    });

    it('should add fks onto the already existing fk set without duplicates with "merge" action', () => {
      const pk = 1;
      let fks = [1, 2, 3];
      state = updateJoinTableState(state, pk, fks);

      fks = [3, 4, 5];
      state = updateJoinTableState(state, pk, fks, 'merge');

      expect(state.entities[pk]).toEqual([1, 2, 3, 4, 5]);
    });

    it('should remove fks from the existing set with action "purge"', () => {
      const pk = 1;
      let fks = [1, 2, 3];
      state = updateJoinTableState(state, pk, fks);

      fks = [3, 4];
      state = updateJoinTableState(state, pk, fks, 'purge');

      expect(state.entities[pk]).toEqual([1, 2]);
    });
  });

  describe('deleteEntityEntries', () => {
    it('should remove an entity from the entity hash', () => {
      const entities = [{ id: 1, title: 'asdf' }, { id: 2, title: 'iop' }];
      state = createEntityEntries(state, entities);
      expect(state.entities['1']).toEqual(entities[0]);

      state = deleteEntityEntries(state, 1);
      expect(state.entities['1']).toEqual(undefined);
      expect(Object.keys(state.entities).length).toEqual(entities.length - 1);

    })
  })
});
