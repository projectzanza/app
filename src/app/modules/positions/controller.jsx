import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import * as actions from './actions';
import Position from './model';
import ModalEditPosition from './EditModal/container';
import ConfirmModal from '../../components/ConfirmModal/confirm';

export default class PositionController {
  static fetchPositions(store, userId) {
    return store.dispatch(actions.getPositions(userId));
  }

  static submitPosition(store, userId, position) {
    return store.dispatch(actions.submitPosition(userId, position));
  }

  static deletePosition(store, userId, positionId) {
    ReactDOM.render(
      <ConfirmModal
        onConfirm={() => store.dispatch(actions.deletePosition(userId, positionId))}
        title="Confirm Deleting Position"
        body="Deleting a position will remove it from your profile"
        show
      />,
      document.getElementById('modal'),
    );
  }

  static createPosition(store, userId) {
    ReactDOM.render(
      <ReduxProvider store={store}>
        <ModalEditPosition
          userId={userId}
          position={new Position()}
          show
        />
      </ReduxProvider>,
      document.getElementById('modal'),
    );
  }

  static editPosition(store, position) {
    ReactDOM.render(
      <ReduxProvider store={store}>
        <ModalEditPosition
          userId={position.user_id}
          position={position}
          show
        />
      </ReduxProvider>,
      document.getElementById('modal'),
    );
  }
}
