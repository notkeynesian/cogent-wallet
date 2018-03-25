// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Counter.css';
import type { infoType } from '../reducers/info';

type Props = {
  getInfo: () => void,
  info: infoType
};

export default class Info extends Component<Props> {
  props: Props;

  render() {
    const {
      getInfo, info
    } = this.props;
    return (
      <div>
        <div className={styles.backButton} data-tid="backButton">
          <Link to="/">
            <i className="fa fa-arrow-left fa-3x" />
          </Link>
        </div>
        <div className={styles.btnGroup}>
          <h3>{info.alias}</h3>
          <button className={styles.btn} onClick={getInfo} data-tclass="btn">
            GETINFO
          </button>
        </div>
      </div>
    );
  }
}
