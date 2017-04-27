import { createEntityEntries, updateJoinTableState } from '../utils';

describe('utils', () => {
  let state = undefined;
  beforeEach(() => {
    state = { entities: {} }
  });

  describe('createEntityEntries', () => {
    it('should place an entity with its id as a reference into the entities property', () => {
      const entities = [{ id: 1, title: 'asdf' }, { id: 2, title: 'iop' }];
      state = createEntityEntries(state, entities);

      expect(Object.keys(state.entities).length).toEqual(entities.length);
      expect(state.entities['1']).toEqual(entities[0]);
    });
  });

  describe('updateJoinTableState', () => {
    it('should add the primary key as an attribute of entities, which holds an array of foreign keys', () => {
      let pk = 1;
      let fks = [1, 2, 3];
      state = updateJoinTableState(state, pk, fks);

      expect(state.entities[pk]).toEqual(fks);
    });
  });
});
