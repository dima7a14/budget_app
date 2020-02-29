import React from 'react';
import { Switch, Route } from 'react-router-dom';
import BaseLayout from 'layouts/BaseLayout';
import Home from 'views/Home';
import Auth from 'views/Auth';
import Accounts from 'views/Accounts';
import Transactions from 'views/Transactions';
import Reports from 'views/Reports';
import NotFound from 'views/NotFound';
import routes from './routes';

export const Routes: React.FC = () => (
  <Switch>
    <Route path={routes.home.path} title={routes.home.title} exact component={Home} />
    <Route path={[routes.signIn.path, routes.signUp.path]} component={Auth} />
    <Route path={routes.accounts.path} component={Accounts} />
    <Route path={routes.transactions.path} component={Transactions} />
    <Route path={routes.reports.path} component={Reports} />
    <Route path="*" component={NotFound} />
  </Switch>
);
