import React from 'react';
import { Switch, Route } from 'react-router-dom';
import BaseLayout from 'layouts/BaseLayout';
import Home from 'views/Home';
import Auth from 'views/Auth';
import Transactions from 'views/Transactions';
import Tasks from 'views/Tasks';
import Statistics from 'views/Statistics';
import NotFound from 'views/NotFound';
import routes from './routes';

export const Routes: React.FC = () => (
  <Switch>
    <BaseLayout>
      <Route path={routes.home.path} title={routes.home.title} exact component={Home} />
      <Route path={[routes.signIn.path, routes.signUp.path]} component={Auth} />
      <Route path={routes.transactions.path} component={Transactions} />
      <Route path={routes.tasks.path} component={Tasks} />
      <Route path={routes.statistics.path} component={Statistics} />
      <Route path="*" component={NotFound} />
    </BaseLayout>
  </Switch>
);
