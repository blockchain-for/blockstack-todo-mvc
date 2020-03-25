import React, { Component } from 'react';
import {
  Person, UserSession
} from 'blockstack';

import { remove, add, check, jsonCopy } from './utils'
import { appConfig, TASK_DATA_FILENAME, ENCYPT_OPTIONS, DECRYPT_OPTIONS, avatarFallbackImage} from './constants'


export default class Profile extends Component {
  constructor(props) {
  	super(props);

  	this.state = {
      tasks: [],
      value: '',
    };
    
    this.loadTasks = this.loadTasks.bind(this);
    this.addTask = this.addTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.checkTask = this.checkTask.bind(this);
    this.changeTask = this.changeTask.bind(this);
  }

  componentWillMount() {
    this.loadTasks();  
  }
  
  componentWillReceiveProps(nextProps) {
    const nextTasks = nextProps.tasks;

    if (nextTasks) {
      if (nextTasks.length !== this.state.tasks.length) {
        this.setState({ tasks: jsonCopy(nextTasks) });
      }
    }
  }
  // saveNewStatus(statusText) {
  //    const { userSession } = this.props

  //    let status = {
  //      text: statusText.trim(),
  //      created_at: Date.now()
  //    }

  //    const options = { encrypt: false }
  //    userSession.putFile(TASK_DATA_FILENAME, JSON.stringify(status), options)
  //      .then(() => {
  //        this.setState({
  //          newStatus: status.text
  //        })
  //      })
  // }

  // 加载数据
  loadTasks() {
    const { userSession } = this.props

    userSession.getFile(TASK_DATA_FILENAME, DECRYPT_OPTIONS)
      .then((rawTask) => {
        if (rawTask) {
          const tasks = JSON.parse(rawTask || '[]')
          console.log(tasks);
          this.setState({
            tasks
          });
        }
        
      })
      .finally(() => {
        console.log("load data from gaia completed!")
      })
  }

  // 增加任务
  addTask(event) {
    event.preventDefault();
    const tasks = add(this.state);

    this.setState({value: '', tasks});
   
    this.saveTasks(tasks, ENCYPT_OPTIONS);
  }

  // 保存任务
  saveTasks(tasks) {
    console.log("Starting save task to blockstack ......");
    this.props.userSession.putFile(TASK_DATA_FILENAME, JSON.stringify(tasks), ENCYPT_OPTIONS);
    console.log("Saved data to Blockstack completed!");
  }

  // 删除任务
  removeTask(event) {
    event.preventDefault();
    const tasks = remove(event.currentTarget.dataset.index, this.state);
    this.setState({ tasks });
    this.saveTasks(tasks, ENCYPT_OPTIONS);
  }

  checkTask(event) {
    const tasks = check(event.target.dataset.index, this.state);
    this.setState({ tasks });
    this.saveTasks(tasks);
  }

  changeTask(event) {
    this.setState({ value: event.target.value });
  }

  // handleNewStatusChange(event) {
  //   this.setState({newStatus: event.target.value})
  // }

  // handleNewStatusSubmit(event) {
  //   this.saveNewStatus(this.state.newStatus)
  //   this.setState({
  //     newStatus: ""
  //   })
  // }

  render() {
    const userData = this.props.userSession.loadUserData();
    const username = userData.username;
    const person  = new Person(userData);

    console.log("The person data:");
    console.log(person);

    return (
     
      <div className="panel-welcome" id="section-2">
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
        {/* <br/>
        <form>
          <textarea className="input-status"
                  value={this.state.value}
                  onChange={this.handleChange}
                  placeholder="输入你的任务"
                  autoFocus={ true }
                  required
                />
          <br/>

          <button
                  className="btn btn-primary btn-lg"
                  onClick={this.addTask}
                  >
                  提交
          </button>
        </form>
        <br />
        <div>
          { this.state.tasks.map((task, idx) =>
            <ul key={idx}>
              <div>
                <input type="checkbox" data-index={idx} oncClick={this.checkTask} checked={task[1] ? true : false} />
                <div>
                  <div>{task[1] ? <s> {task[0]}</s> : task[0]}</div>
                </div>
                <div>
                  <button data-index={idx} onClick={this.removeTask}>
                     删除任务
                  </button>
                </div>
              </div>
            </ul>
          )}
        </div> */}

      </div>
    );
  }

  
}


Profile.defaultProps = {
  userSession: new UserSession(appConfig)
};
