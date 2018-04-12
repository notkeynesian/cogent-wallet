// @flow
import React, { Component } from 'react';

type Props = {
  walletBalance: () => void,
  wallet: any
};

export default class Info extends Component<Props> {
  props: Props;

  render() {
    const {
      walletBalance, wallet
    } = this.props;
    return (
      <div>
        <br /><br />
        <div>
          <button onClick={walletBalance} className="btn btn-primary btn-sm">
            Invoke
          </button>
          <br /><br />
          <table>
            <tbody>
              <tr>
                <td>total_balance:</td>
                <td>{wallet.total_balance}</td>
              </tr>
              <tr>
                <td>confirmed_balance:</td>
                <td>{wallet.confirmed_balance}</td>
              </tr>
              <tr>
                <td>unconfirmed_balance:</td>
                <td>{wallet.unconfirmed_balance}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
