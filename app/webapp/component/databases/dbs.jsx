import React, { Component } from 'react';
import {map} from 'lodash/fp';

export default class Databases extends Component {
  constructor(props) {
    super(props);
    console.log('constructing');
  }

  render() {
    const {
      databases,
      refreshDbs,
      selectDb
    } = this.props;
    return (
      <div className="databases">
        {map(d => (
          <li>
            <button type="button" onClick={() => selectDb(d.name)}>
              Select
            </button>
            {d.description}
            -
            {d.name}
          </li>
        ), databases)}
        <button onClick={refreshDbs} type="button">
          refresh dbs
        </button>
      </div>
    );
  }
}
