import React, { Component } from 'react';

export default class DateFilter extends Component {
  render() {
    const {
      filter,
      value,
      update
    } = this.props;

    return (
      <div className="argument">
        {filter.help}
        (date)
        <input type="text" value={value} onChange={update} />
      </div>
    );
  }
}
