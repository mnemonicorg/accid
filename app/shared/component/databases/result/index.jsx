import React, { Component } from 'react';

import SugarcubeResult from './sugarcube';
import JsonResult from './json';

export default class ResultComponent extends Component {
  render() {
    const {
      data,
      type
    } = this.props;

    switch (type) {
      case 'sugarcube':
        return <SugarcubeResult data={data} />;
      case 'json':
        return <JsonResult data={data} />;
      default:
        return <JsonResult data={data} />;
    }
  }
}
