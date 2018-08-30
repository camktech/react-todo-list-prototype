import React, { Component } from 'react';
import Task from './Task';
import Group from './Group';

class List extends Component{
  render(){
    return (
      <div className='list'>
        {this.props.items.map((item) => {
          return (listComponent(item, this))
        })}
      </div>
    );
  }
}

const listComponent = (item, listComponent) => {
  switch(listComponent.props.type){
    case 'group':
      return (<Group group={item} key={item.groupName}/>);

    case 'task':
      return (<Task task={item} key={item.id} setLockedTasks={() => {listComponent.props.setLockedTasks(listComponent.props.items)}}/>);

    default:
      return null;
  }
};

export default List;
