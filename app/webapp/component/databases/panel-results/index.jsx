import React, { Component } from 'react';
import ReactJson from 'react-json-view';
import {map, isEmpty, size} from 'lodash/fp';
import ResultComponent from './result/index';

export default class Results extends Component {
  constructor(props) {
    super(props);
    console.log('constructing');
  }

  render() {
    const {
      results,
      selectedDatabase,
    } = this.props;
    const idKey = selectedDatabase.id_key;
    return (
      <ul className="results">
        {map(d => (
          <li className="result">
            {!isEmpty(d.accid.annotations) ?
              'edit annotations'
              : ' add annotations '}
            <hr />
            {size(d.accid.cluster)}
            | units in cluster
            <hr />
            {d[idKey]}
            <hr />
            <ResultComponent data={d} type={selectedDatabase.type} />
            <hr />
            <ReactJson src={d} name={null} collapsed />
          </li>
        ), results)}
      </ul>
    );
  }
}
