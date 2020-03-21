import React from "react";

class Login extends React.Component {
  handleSignIn = () => {
    this.props.userSession.redirectToSignIn();
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