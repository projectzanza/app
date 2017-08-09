import React from 'react';
import PropTypes from 'prop-types';
import PaymentsController from '../controller';
import CardList from './components/list';
import Card from '../model';

class CardsContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.store = context.store;
    this.state = { cards: [] };
  }

  componentDidMount() {
    PaymentsController.fetchCards(this.store);

    this.unsubscribe = this.store.subscribe(() => {
      this.setState({ cards: Card.all(this.store) });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (<CardList
      cards={this.state.cards}
      onCardSelect={this.props.onCardSelect}
    />);
  }
}

CardsContainer.contextTypes = {
  store: PropTypes.object,
};

CardsContainer.propTypes = {
  onCardSelect: PropTypes.func.isRequired,
};

export default CardsContainer;
