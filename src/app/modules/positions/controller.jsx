import * as actions from './actions';

export default class PositionController {
  static fetchPositions(store, userId) {
    return store.dispatch(actions.getPositions(userId));
  }
}
