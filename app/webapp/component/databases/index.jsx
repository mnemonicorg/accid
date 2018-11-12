import React, { Component } from 'react';

import Database from './panel-database';
import Databases from './panel-databases';
import Results from './panel-results';
import Tray from './panel-tray';


export default class DatabaseWrapper extends Component {
  constructor(props) {
    super(props);
    console.log('constructing');
    props.refreshDbs();
  }

  componentDidMount() {
    console.log('didmount');
  }

  render() {
    return (
      <div className="db-wrapper">
        <Databases {...this.props} />
        <Database {...this.props} />
        <Results {...this.props} />
        <Tray {...this.props} />
      </div>
    );
  }
}
