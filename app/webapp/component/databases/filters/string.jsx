import React, { Component } from 'react';

export default class StringFilter extends Component {
  render() {
    const {
      filter,
      value,
      update
    } = this.props;

    return (
      <div className="argument">
        {filter.help}
        (string)
        <input type="text" value={value} onChange={update} />
      </div>
    );
  }
}
