import React, { Component } from 'react';

import { UserSession, AppConfig } from "blockstack"
import TodoApp from './TodoApp';
import Login from './Login'; 
import Profile from './Profile.js';


const appConfig = new AppConfig(['store_write', 'publish_data']);
const userSession = new UserSession({ appConfig: appConfig });

class App extends Component {
  constructor(props) {
    super(props);
    console.log(appConfig);
    console.log(userSession);
  }
  
  componentWillMount() {
    if (userSession.isSignInPending()) {
      userSession
        .handlePendingSignIn()
        .then(userData => {
          //window.location = window.location.origin;
          window.history.replaceState({}, document.title, "/");
          console.log("the userData is " + userData);
          this.setState({ userData: userData });
        })
        .catch(err => console.log(err));
    }
  }

  render() {
    return (
      <div>
        {userSession.isUserSignedIn() ? (
          <div>
            <Profile userSession={userSession} handleSignOut={ this.handleSignOut } />
            <TodoApp userSession={userSession} />
          </div>
        ) : (
          <Login userSession={userSession} />
        )}
      </div>
    );
  }
}

export default App;
