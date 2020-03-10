import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from 'views/Home';
import Auth from 'views/Auth';
import Accounts from 'views/Accounts';
import Transactions from 'views/Transactions';
import Reports from 'views/Reports';
import NotFound from 'views/NotFound';

import routes from './routes';
import { PrivateRoute } from './utils';

export const Routes: React.FC = () => (
  <Switch>
    <PrivateRoute path={routes.home.path} exact><Home /></PrivateRoute>
    <Route path={[routes.signIn.path, routes.signUp.path]}><Auth /></Route>
    <PrivateRoute path={routes.accounts.path}><Accounts /></PrivateRoute>
    <PrivateRoute path={routes.transactions.path}><Transactions /></PrivateRoute>
    <PrivateRoute path={routes.reports.path}><Reports /></PrivateRoute>
    <Route path="*"><NotFound /></Route>
  </Switch>
);
