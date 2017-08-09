import {
  getEntity,
  getEntities,
} from '../../lib/store/utils';

export default class Model {
  static find(store, id) {
    return getEntity(store, this.table, id);
  }

  static all(store) {
    return getEntities(store, this.table);
  }

  constructor(entity = {}) {
    // get all the keys from defaults and the entity
    // pass the keys from entity into the default function with the same key name
    // to get the default value of the entity
    // then add the rest of the entity keys in which don't have default values
    const keys = Object.keys(this.constructor.defaults).concat(Object.keys(entity));
    const uniqKeys = [...new Set(keys)];

    uniqKeys.map((key) => {
      let value;
      if (key in this.constructor.defaults) {
        value = this.constructor.defaults[key](entity[key]);
      } else {
        value = entity[key];
      }
      this[key] = value;
      return this[key];
    });
  }
}

Model.defaults = {};

Model.table = undefined;

