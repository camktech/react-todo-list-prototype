import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import GroupsAll from './GroupsAll';
import GroupTasks from './GroupTasks';

class Main extends Component {
  render(){
    return (
      <div id="main">
        <Switch>
          <Route exact path='/' component={GroupsAll}/>
          <Route path='/:id' component={GroupTasks}/>
        </Switch>
      </div>
    );
  }
}

export default Main;
