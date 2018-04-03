// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  increment: () => void,
  incrementIfOdd: () => void,
  incrementAsync: () => void,
  decrement: () => void,
  counter: number
};

export default class Counter extends Component<Props> {
  props: Props;

  render() {
    const {
      increment, incrementIfOdd, incrementAsync, decrement, counter
    } = this.props;
    return (
      <div>
        <div data-tid="backButton">
          <Link to="/">
            Home
          </Link>
        </div>
        <div className="counter" data-tid="counter">
          {counter}
        </div>
        <div>
          <button onClick={increment} data-tclass="btn">
            +
          </button>
          <button onClick={decrement} data-tclass="btn">
            -
          </button>
          <button onClick={incrementIfOdd} data-tclass="btn">odd</button>
          <button onClick={() => incrementAsync()} data-tclass="btn">async</button>
        </div>
      </div>
    );
  }
}
