import React, { Component } from 'react';

import StringFilter from './string';
import DateFilter from './date';

export default class Filter extends Component {
  render() {
    const {
      filter, update, value
    } = this.props;

    switch (filter.type) {
      case 'string':
        return <StringFilter value={value} update={update} filter={filter} />;
      case 'date':
        return <DateFilter value={value} update={update} filter={filter} />;
      default:
        return <StringFilter value={value} update={update} filter={filter} />;
    }
  }
}
