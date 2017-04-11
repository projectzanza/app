import React from 'react';
import { browserHistory } from 'react-router';
import LoginContainer from './Login/container';
import RegisterContainer from './SignUp/container';
import SessionContainer from './Session/container';
import AuthButtonsContainer from './AuthButtons/container';
import ProfileContainer from './Profile/container';
import ListContainer from './List/container';

class UserController {
  constructor(store) {
    this.store = store;
  }

  static onLoginSuccess() {
    browserHistory.push('/dashboard');
  }

  static onSignUpSuccess() {
    browserHistory.push('/login');
  }

  static loginScene() {
    return <LoginContainer onLoginSuccess={UserController.onLoginSuccess} />;
  }

  static signUpScene() {
    return <RegisterContainer onSignUpSuccess={UserController.onSignUpSuccess} />;
  }

  static onAuthError() {
    browserHistory.push('/login');
  }

  static session(props) {
    return (
      <SessionContainer onAuthError={UserController.onAuthError} >
        { props.children }
      </SessionContainer>
    );
  }

  static onClickLogin() {
    browserHistory.push('/login');
  }

  static onLogout() {
    browserHistory.push('/');
  }

  static onClickSignUp() {
    browserHistory.push('/signup');
  }

  static onClickProfile(user) {
    browserHistory.push(`/user/${user.id}`);
  }

  static authButtons() {
    return (
      <AuthButtonsContainer
        onClickLogin={UserController.onClickLogin}
        onClickSignUp={UserController.onClickSignUp}
        onClickProfile={UserController.onClickProfile}
        onLogout={UserController.onLogout}
      />
    );
  }

  static onUpdateSuccess(user) {
    browserHistory.push(`/user/${user.id}`);
  }

  static onCancelEdit(user) {
    browserHistory.push(`/user/${user.id}`);
  }

  static onEdit(user) {
    browserHistory.push(`/user/${user.id}/edit`);
  }

  static profileScene(props) {
    return (<ProfileContainer
      {...props}
      onUpdateSuccess={UserController.onUpdateSuccess}
      onCancelEdit={UserController.onCancelEdit}
      onEdit={UserController.onEdit}
    />);
  }

  static onClickUser(ev, user) {
    ev.preventDefault();
    browserHistory.push(`/user/${user.id}`);
  }

  static listScene(props) {
    return (
      <ListContainer
        {...props}
        onClickUser={UserController.onClickUser}
      />
    );
  }
}


export default UserController;
