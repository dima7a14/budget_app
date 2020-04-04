import React from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { useStoreMap } from 'effector-react';

import routes from './routes';

import globalStore from 'stores/global';


export const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const isAuthenticated = useStoreMap({
    store: globalStore.user.$store,
    keys: [],
    fn: u => !!u.token,
  });

  return (
    <Route
      {...rest}
      render={({ location }) => isAuthenticated ? children : (
        <Redirect
          to={{ pathname: routes.signIn.path, state: { from: location } }}
        />
      )}
    />
  );
};

export const NotAuthenticatedRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const isAuthenticated = useStoreMap({
    store: globalStore.user.$store,
    keys: [],
    fn: u => !!u.token,
  });

  return (
    <Route
      {...rest}
      render={({ location }) => isAuthenticated ? (
        <Redirect
          to={{ pathname: routes.transactions.path, state: { from: location } }}
        />
      ) : children}
    />
  );
};
