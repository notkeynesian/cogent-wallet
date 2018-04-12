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
          <br /><br />
          <table>
            <tbody>
              <tr>
                <td>identity_pubkey:</td>
                <td>{info.identity_pubkey}</td>
              </tr>
              <tr>
                <td>alias:</td>
                <td>{info.alias}</td>
              </tr>
              <tr>
                <td>num_pending_channels:</td>
                <td>{info.num_pending_channels}</td>
              </tr>
              <tr>
                <td>num_active_channels:</td>
                <td>{info.num_active_channels}</td>
              </tr>
              <tr>
                <td>num_peers:</td>
                <td>{info.num_peers}</td>
              </tr>
              <tr>
                <td>block_height:</td>
                <td>{info.block_height}</td>
              </tr>
              <tr>
                <td>block_hash:</td>
                <td>{info.block_hash}</td>
              </tr>
              <tr>
                <td>synced_to_chain:</td>
                <td>{info.synced_to_chain}</td>
              </tr>
              <tr>
                <td>testnet:</td>
                <td>{info.testnet}</td>
              </tr>
              <tr>
                <td>chains:</td>
                <td>{info.chains}</td>
              </tr>
              <tr>
                <td>uris:</td>
                <td>{info.uris}</td>
              </tr>
              <tr>
                <td>best_header_timestamp:</td>
                <td>{info.best_header_timestamp}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
