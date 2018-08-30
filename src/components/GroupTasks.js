import React, { Component } from 'react';
import List from './List';
import PageHeader from './PageHeader';
import TasksService from '../services/Tasks';
import completeImg from '../img/Completed.svg';
import incompleteImg from '../img/Incomplete.svg';
import lockedImg from '../img/Locked.svg';

class GroupTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTasks: [],
      allTasks: []
    };
  }

  currentGroup(){
    return decodeURI(window.location.pathname.replace('/', ''));
  }
  
  render(){
    return (
      <div id='group-tasks'>
        <PageHeader title={this.currentGroup()} link={'/'} linkName={'ALL GROUPS'}/>
        <List items={this.state.currentTasks} type='task' setLockedTasks={this.setLockedTasks.bind(this)}/>
      </div>
    );
  }

  setLockedTasks(currentTasks){
    currentTasks.forEach((task) => {
      task.locked = false;
      let dependencies = this.state.allTasks.filter((t) => {return task.dependencyIds.indexOf(t.id) >= 0});
      if(dependencies.some((t) => {return !t.completedAt})){
        task.locked = true;
        task.icon = lockedImg;
      }
      else if(task.completedAt){
        task.icon = completeImg;
      }
      else{
        task.icon = incompleteImg;
      }

      });
    this.setState({currentTasks: currentTasks});
  }

  componentDidMount() {
    TasksService.all()
    .then((tasks) => {
      let currentTasks = tasks.filter((t) => { return t.group === this.currentGroup()});
      this.setState({allTasks: tasks});
      this.setLockedTasks(currentTasks);
    });
  }
}

export default GroupTasks;
