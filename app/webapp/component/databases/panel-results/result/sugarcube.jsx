import React, { Component } from 'react';

export default class SugarcubeResult extends Component {
  render() {
    const {
      data
    } = this.props;
    return (
      <div className="results">
        {data._sc_source}
      </div>
    );
  }
}
