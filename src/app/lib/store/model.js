import { getEntity } from '../../lib/store/utils';

export default class Model {
  static find(store, id) {
    const entity = getEntity(store, this.constructor.table, id);
    if (entity) {
      return new Model(entity);
    }
    return new Model({ id, isLocal: false });
  }

  constructor(entity = {}) {
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

