import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import CssBaseline from '@material-ui/core/CssBaseline';

import { Routes } from 'router';
import BaseLayout from '../BaseLayout';


const App: React.FC = () => (
  <BrowserRouter>
    <CssBaseline />
    <BaseLayout>
      <Routes />
    </BaseLayout>
  </BrowserRouter>
);

export default hot(module)(App);
