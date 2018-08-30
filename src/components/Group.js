import React, { Component } from 'react';
import groupCarrot from '../img/Group.svg';
import { Link } from "react-router-dom";

class Group extends Component{
  render(){
    return (
      <Link to={`/${this.props.group.groupName}`}>
        <div className='group list-item'>

          <img className='group-icon' src={groupCarrot}/>
          <div className='group-info'>    
            <div className='group-name'>
              {this.props.group.groupName}
            </div>

            <div className='group-completion'>
              {this.props.group.completed} OUT OF {this.props.group.total} TASKS COMPLETE
            </div>
          </div>

        </div>
      </Link>
    );
  }
}

export default Group;
