import React, { Component } from 'react';
import {
  Person, UserSession
} from 'blockstack';

import { appConfig, avatarFallbackImage} from './constants'


export default class Profile extends Component {
  
  render() {
    
    const userData = this.props.userSession.loadUserData();
    const username = userData.username;
    const person  = new Person(userData);

    console.log("The person data:");
    console.log(person);

    return (
     
      <div className="ui text container center aligned">
        <div className="avatar-section">
          <img src={ person.avatarUrl() ? person.avatarUrl() : avatarFallbackImage } className="img-rounded avatar" id="avatar-image" alt=""/>
        </div>
        <p>Hello, <span id="heading-name">{ username ? username : 'Nameless Person' }</span>!</p>
        <p className="lead">
          <button
            className="btn btn-primary btn-lg"
            id="signout-button"
            onClick={this.props.handleSignOut}
          >
            Logout
          </button>
        </p>
        <br/>
        

      </div>
    );
  }

  
}


Profile.defaultProps = {
  userSession: new UserSession(appConfig)
};
