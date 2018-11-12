import React, { Component } from 'react';
import {
  map, curry, getOr, isEqual
} from 'lodash/fp';

import Filter from './filter';

const mapW = map.convert({cap: false});

export default class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // in here, check to see if we already have saved values of what we weren
  // filtering.  if so, use these as the state.
  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.filterValues, this.state)) {
      this.setState(nextProps.filterValues);
    }
  }

  // given the database we are in, and the filter key we are updating,
  // update the filters state in this componens
  handleChange(db, filter, event) {
    // console.log('A change was detected: ');
    // console.log(this.state);
    this.setState({[filter]: event.target.value});
  }

  // submit the current filter state to the database.  Result
  // will render in the results panel
  handleSubmit(e) {
    e.preventDefault();
    const { filterDb } = this.props;
    console.log('A name was submitted: ');
    console.log(this.state);
    console.log(filterDb(this.state));
  }

  render() {
    const {
      db,
      filterTypes
    } = this.props;

    // little trick to make a custom handleChange function for each filter
    const hc = curry(
      (database, filter, e) => this.handleChange(database, filter, e)
    );

    return (
      <form className="filters" onSubmit={this.handleSubmit}>
        {mapW((v, k) => (
          <div className="filter">
            <h6 className="filterkey">
              {k}
            </h6>
            <Filter value={getOr(undefined, k, this.state)} filter={v} update={hc(db, k)} />
          </div>
        ))(filterTypes)}
        <input type="submit" value="Filter" />
      </form>
    );
  }
}
