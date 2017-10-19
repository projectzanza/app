import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import { browserHistory } from 'react-router';
import HeaderContainer from '../modules/header/container';
import AuthButtons from '../modules/user/AuthButtons/container';
import routes from './routes';

class App extends React.Component {
  static onClickTitle() {
    browserHistory.push(routes.dashboard.show);
  }

  static onClickSignIn() {
    browserHistory.push(routes.app.signin);
  }

  static onClickSignUp() {
    browserHistory.push(routes.app.signup);
  }

  static onClickProfile(user) {
    browserHistory.push(routes.user.show(user.id));
  }

  static authButtons() {
    return (
      <AuthButtons
        onClickLogin={App.onClickSignIn}
        onClickSignUp={App.onClickSignUp}
        onClickProfile={App.onClickProfile}
      />
    );
  }


  render() {
    return (
      <IntlProvider locale="en-GB">
        <div>
          <HeaderContainer
            onClickTitle={App.onClickTitle}
            authButtons={App.authButtons}
          />
          <div className="content">
            {this.props.children}
          </div>
        </div>
      </IntlProvider>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
};
App.getDefaultProps = {
  children: null,
};

export default App;
