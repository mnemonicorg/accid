import React, { Component } from 'react';

export default class Tray extends Component {
  constructor(props) {
    super(props);
    console.log('constructing');
  }

  render() {
    return (
      <div className="tray">
        tray
      </div>
    );
  }
}
