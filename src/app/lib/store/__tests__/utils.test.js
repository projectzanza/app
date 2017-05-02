import configureMockStore from 'redux-mock-store';
import * as utils from '../utils';

const mockStore = configureMockStore();

describe('Utils', () => {
  let hasOneTable;
  let hasManyTable;
  let entityTable;
  let store;

  beforeEach(() => {
    hasOneTable = {
      entities: {
        '1': '100',
        '2': '200',
      }
    };
    hasManyTable = {
      entities: {
        '3': [300, 301, 302],
        '4': [400, 401, 402],
        '5': '100',           // this should not happen, checking error state
        '6': [],
      }
    };
    entityTable = {
      entities: {
        '100': { id: 100 },
        '200': { id: 200 },
        '300': { id: 300 },
        '301': { id: 301 },
        '302': { id: 302 },
        '400': { id: 400 },
        '401': { id: 401 },
        '402': { id: 402 },
      }
    };

    store = mockStore({
      hasOneTable,
      hasManyTable,
      entityTable
    });
  });

  describe('getEntity', () => {
    it('should return an entity',() => {
      let entity = utils.getEntity(store, 'entityTable', '100');
      expect(entity).toEqual({ id: 100 });
    });

    it('should return undefined if the entity does not exist', () => {
      let entity = utils.getEntity(store, 'entityTable', '1000');
      expect(entity).toEqual(undefined);
    })
  });


  describe('getJoinEntities', () => {
    it('should return a single entity for a hasOne join', () => {
      let entity = utils.getJoinEntities({
        store: store,
        primaryKey: '1',
        joinTable: 'hasOneTable',
        entityTable: 'entityTable',
        joinType: 'hasOne',
      });
      expect(entity).toEqual({ id: 100 });
    });

    it('should return undefined if primaryKey does not exist', () => {
      let entity = utils.getJoinEntities({
        store: store,
        primaryKey: '10',
        joinTable: 'hasOneTable',
        entityTable: 'entityTable',
        joinType: 'hasOne',
      });
      expect(entity).toEqual(undefined);
    });

    it('should return an array of entities for a hasMany join', () => {
      let entity = utils.getJoinEntities({
        store: store,
        primaryKey: '3',
        joinTable: 'hasManyTable',
        entityTable: 'entityTable',
      });
      expect(entity).toEqual([{ id: 300 }, { id: 301 }, { id: 302 }]);
    });

    it('should return an empty array if the primaryKey does not exist', () => {
      let entity = utils.getJoinEntities({
        store: store,
        primaryKey: '30',
        joinTable: 'hasManyTable',
        entityTable: 'entityTable',
      });
      expect(entity).toEqual([]);
    });

    it('should return an empty array if the primary key is not linked to any entities', () => {
      let entity = utils.getJoinEntities({
        store: store,
        primaryKey: '6',
        joinTable: 'hasManyTable',
        entityTable: 'entityTable',
      });
      expect(entity).toEqual([]);
    });

    it('should throw an error if the linked entities is not an array', () => {
      expect(utils.getJoinEntities({
        store: store,
        primaryKey: '5',
        joinTable: 'hasManyTable',
        entityTable: 'entityTable',
      })).toThrow();
    });
  });
});
