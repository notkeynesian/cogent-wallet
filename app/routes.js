/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import InfoPage from './containers/InfoPage';
import WalletPage from './containers/WalletPage';

export default () => (
  <App>
    <Switch>
      <Route path="/info" component={InfoPage} />
      <Route path="/walletBalance" component={WalletPage} />
      <Route path="/" component={HomePage} />
    </Switch>
  </App>
);
