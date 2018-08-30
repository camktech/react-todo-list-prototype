import React, { Component } from 'react';
import List from './List';
import PageHeader from './PageHeader';
import TasksService from '../services/Tasks';

class GroupsAll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: []
    };
  }

  render(){
    return (
      <div id='groups-all'>
        <PageHeader title={'Things To Do'}/>
        <List items={this.state.groups} type='group'/>
      </div>
    );
  }

  componentDidMount() {
    TasksService.all()
    .then((tasks) => this.setGroupTasks(tasks));
  }

  setGroupTasks(tasks){
    let groupHash = {};
    let groups = [];

    tasks.forEach((task) => {
      if(!groupHash[task.group]){
        groupHash[task.group] = {groupName: task.group, total: 0, completed: 0}
      }
      groupHash[task.group].total++;
      if(task.completedAt){
        groupHash[task.group].completed++;
      }
    });

    for(let group in groupHash){
      groups.push(groupHash[group]);
    }

    this.setState({groups: groups});
  }
}

export default GroupsAll;
