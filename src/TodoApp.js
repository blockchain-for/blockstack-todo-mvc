import React, { Component } from  'react';


import { remove, add, check, jsonCopy } from './utils'
import { TASK_DATA_FILENAME, ENCYPT_OPTIONS, DECRYPT_OPTIONS } from './constants'

class TodoApp extends Component {
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
    this.handleTaskChange = this.handleTaskChange.bind(this);
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

  handleTaskChange(event) {
    this.setState({ value: event.target.value });
  }


  render() {
    return (
      <div
        style={{ padding: "30px 0" }}
        className="ui text container center aligned"
      >
        <h2>Blackstack Todo MVC</h2>
        <div className="ui grid">
          <div className="row centered">
            <div className="column twelve wide">
              <form className="ui form" onSubmit={this.addTask}>
                <div className="inline fields">
                  <div className="twelve wide field">
                    <input
                      type="text"
                      value={this.state.value}
                      onChange={this.handleTaskChange}
                    />
                    <br />
                    <input className="twelve wide field"
                      type="text"
                      value
                    />
                  </div>
                  <button className="ui button primary" type="submit">
                    Add todo
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="row centered">
            <div className="column twelve wide">
              <div className="grouped fields">
                {this.state.tasks
                  .map((todo, idx) => (
                    <div key={idx} className="field">
                      <div className="ui checkbox">
                        <input
                          type="checkbox"
                          data-index={idx} oncClick={this.checkTask} checked={todo[1] ? true : false}
                        />
                        <label>{todo[1] ? <s> {todo[0]}</s> : todo[0]}</label>
                      </div>
                      <span>
                        <button data-index={idx} onClick={this.removeTask}>
                          X
                        </button>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}



export default TodoApp;