// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  getInfo: () => void,
  info: any
};

export default class Info extends Component<Props> {
  props: Props;

  render() {
    const {
      getInfo, info
    } = this.props;
    return (
      <div>
        <div data-tid="backButton">
          <Link to="/">
            Home
          </Link>
        </div>
        <div>
          <h3>{info.alias}</h3>
          <button onClick={getInfo} data-tclass="btn">
            GETINFO
          </button>
        </div>
      </div>
    );
  }
}
