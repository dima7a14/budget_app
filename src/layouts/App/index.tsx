import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import CssBaseline from '@material-ui/core/CssBaseline';

import { Routes } from 'router';

import { useStyles } from './styles';
// import Header from 'partials/Header';


const App: React.FC = () => {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <CssBaseline />
      <div className={classes.root}>
        <Routes />
      </div>
    </BrowserRouter>
  );
};

export default hot(module)(App);
