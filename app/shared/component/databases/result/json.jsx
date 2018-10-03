import React, { Component } from 'react';
import {keys} from 'lodash/fp';

export default class SugarcubeResult extends Component {

  render() {
    const {
      data
    } = this.props;
    return (
      <div className="results">
        {keys(data)}
      </div>
    );
  }
}
