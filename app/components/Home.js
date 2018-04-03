// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        <div data-tid="container">
          <h2>Home</h2>
          <Link to="/counter">to Counter</Link><br />
          <Link to="/info">to Info</Link><br />
        </div>
      </div>
    );
  }
}
