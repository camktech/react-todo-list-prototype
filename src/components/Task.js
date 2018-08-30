import React, { Component } from 'react';

class Task extends Component{
  toggleComplete(){
    if(this.props.task.completedAt){
      this.props.task.completedAt = null;
    }
    else{
      this.props.task.completedAt = Date.now()
    }
  }

  handleTaskClick(){
    if(this.isLocked()){
      return;
    }
    else{
      this.toggleComplete();
      this.props.setLockedTasks();
    }
  }

  isLocked(){
    return this.props.task.locked;
  }

  taskElementClass(){
     return `task list-item ${this.isLocked() ? 'locked' : ''} ${this.props.task.completedAt ? 'completed' : ''}`;
  }

  render(){
    return (
      <div className={this.taskElementClass()} onClick={this.handleTaskClick.bind(this)}>
        <img className='task-checkbox' src={this.props.task.icon}/>
        <div className='task-description'>{this.props.task.task}</div>
      </div>
    );
  }
}

export default Task;
