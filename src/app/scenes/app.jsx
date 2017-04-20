import React from 'react';
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

  static onClickSignOut() {
    browserHistory.push(routes.app.home);
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
        onClickLogout={App.onClickSignOut}
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
  children: React.PropTypes.node,
};
App.getDefaultProps = {
  children: null,
};

export default App;
