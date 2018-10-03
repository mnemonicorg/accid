import React, { Component } from 'react';

import Database from './db';
import Databases from './dbs';
import Results from './results';
import Tray from './tray';


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
