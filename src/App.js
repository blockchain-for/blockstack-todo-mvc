import React, { Component } from 'react';

import { UserSession } from "blockstack"

import {configure } from 'radiks';

import Login from './Login'; 
import Profile from './Profile.js';
import TodoApp from './TodoApp';
import { appConfig } from './constants';


const userSession = new UserSession({ appConfig: appConfig });

configure({
  apiServer: 'http://localhost:1260',
  userSession
});

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
          console.log("the userData is " + userData);
          //window.location = window.location.origin;
          window.history.replaceState({}, document.title, "/");
          
          this.setState({ userData: userData });
        })
        .catch(err => console.log(err));
    }
  }

  handleSignOut(event) {
    event.preventDefault();
    userSession.signUserOut(window.location.origin);

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
