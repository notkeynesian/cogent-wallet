// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

type Props = {};

export default class Header extends Component<Props> {
  props: Props;

  render() {
    return (
      <nav className="nav nav-pills nav-justified">
        <Link className="nav-link active" to="/">Cogent Wallet</Link><br />
        <Link className="nav-link" to="/info">to Info</Link><br />
      </nav>
    );
  }
}
