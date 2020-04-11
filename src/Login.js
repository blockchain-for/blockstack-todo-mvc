import React from "react";

import { User, getConfig } from 'radiks';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleSignIn = this.handleSignIn.bind(this);
  }
  
  handleSignIn = () => {
    // this.props.userSession.redirectToSignIn();
    const {userSession } = getConfig();
    if (userSession.isSignInPending()) {
      await userSession.handlePendingSignIn();
      await User.createWithCurrentUser();
    } 
  };

  render() {
    return (
      <div
        style={{ padding: "30px 0" }}
        className="ui text container center aligned"
      >
        <h1>Blockstack Todo List</h1>

        <button className="ui button positive" onClick={this.handleSignIn}>
          Sign in with Blockstack
        </button>
      </div>
    );
  }
}

export default Login;