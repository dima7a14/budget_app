import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from 'views/Home';
import Auth from 'views/Auth';
import Transactions from 'views/Transactions';
import Tasks from 'views/Tasks';
import Statistics from 'views/Statistics';
import NotFound from 'views/NotFound';

export const paths = {
  home: {
    name: 'home',
    path: '/'
  },
  signIn: {
    name: 'signIn',
    path: '/sign-in'
  },
  signUp: {
    name: 'signUp',
    path: '/sign-up'
  },
  transactions: {
    name: 'transactions',
    path: '/transactions'
  },
  tasks: {
    name: 'tasks',
    path: '/tasks'
  },
  statistics: {
    name: 'statistics',
    path: '/statistics'
  }
};

export const Routes: React.FC = () => (
  <Switch>
    <Route path={paths.home.path} exact>
      <Home />
    </Route>
    <Route path={paths.signIn.path}>
      <Auth />
    </Route>
    <Route path={paths.signUp.path}>
      <Auth />
    </Route>
    <Route path={paths.transactions.path}>
      <Transactions />
    </Route>
    <Route path={paths.tasks.path}>
      <Tasks />
    </Route>
    <Route path={paths.statistics.path}>
      <Statistics />
    </Route>
    <Route path="/">
      <NotFound />
    </Route>
  </Switch>
);
