import React, { Component } from 'react';
import { Link } from "react-router-dom";

class PageHeader extends Component{
  render(){
    return (
      <div className='page-header'>
        <div className='page-title'>
          {this.props.title}
        </div>
        {this.props.link &&
          <Link className='header-link' to={this.props.link}>
            {this.props.linkName}
          </Link>
        }
      </div>
    );
  }
}

export default PageHeader;
