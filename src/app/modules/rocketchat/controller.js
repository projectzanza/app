import * as actions from './actions';

class Controller {
  static login(store) {
    return store.dispatch(actions.postLogin());
  }
}

export default Controller;
