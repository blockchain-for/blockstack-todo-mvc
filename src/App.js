import React, { Component } from 'react';
import Profile from './Profile.js';
import Signin from './Signin.js';

import { UserSession, AppConfig } from "blockstack"
 

const appConfig = new AppConfig(['store_write', 'publish_data']);
const userSession = new UserSession({ appConfig: appConfig });

class App extends Component {
  state = {
    todos: [
      {
        id: 1,
        title: "看富爸爸穷爸爸",
        done: false,
      },
      {
        id: 2,
        title: "同观喜玩Scratch",
        done: false,
      },
    ],
  }

  constructor(){
    super()
    console.log(appConfig)
    console.log(userSession)
  }

  handleSignIn(e) {
    e.preventDefault();
    userSession.redirectToSignIn();
  }

  handleSignOut(e) {
    e.preventDefault();
    userSession.signUserOut(window.location.origin);
  }
  
  render() {
    return (
    <div>
      廖师虎！
      <div style={{ padding: "30px 0" }}
        className="ui text container center aligned">
        <h2>Blockstack Todo List</h2>
        <div className="ui grid">
          <div className="row centered">
            <div className="column twelve wide">
              <div className="grouped fields">
                {this.state.todos
                  .filter(todo => !todo.done)
                  .map(todo => (
                    <div key={todo.id} className="field">
                      <div className="ui checkbox">
                        <input type="checkbox" />
                        <label>{todo.title}</label>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}}

export default App;
