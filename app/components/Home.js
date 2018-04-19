// @flow
import React, { Component } from 'react';

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
        <br /><br />
        <div>
          <button onClick={getInfo} className="btn btn-primary btn-sm">
            Invoke
          </button>
          <h3>{info.block_height}</h3>
        </div>
      </div>
    );
  }
}

