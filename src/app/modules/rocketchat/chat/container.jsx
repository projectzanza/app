import React from 'react';
import PropTypes from 'prop-types';
import RocketChatController from '../controller';
import Config from '../../../config/app';

class Chat extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.store = context.store;
    this.state = {
      token: null,
    };
    this.onLoad = this.onLoad.bind(this);
  }

  componentDidMount() {
    RocketChatController.login(this.store)
      .then(token => this.setState({ token }));
  }

  onLoad() {
    window.addEventListener('message', (e) => {
      if (e.data.eventName === 'startup') {
        this.iframe.contentWindow.postMessage(
          {
            event: 'login-with-token',
            loginToken: this.state.token,
          },
          Config.rocketChatUrl);
      }
    });
  }

  render() {
    if (this.state.token) {
      return (
        <iframe
          ref={(iframe) => { this.iframe = iframe; }}
          src={Config.rocketChatUrl}
          width="100%"
          height="900"
          onLoad={this.onLoad}
        />
      );
    }
    return null;
  }
}

Chat.contextTypes = {
  store: PropTypes.object,
};
export default Chat;
