import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import { Routes } from 'router';
import Header from 'partials/Header';

import styles from './styles.module.scss';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <div className={styles.app}>
        <Routes />
      </div>
    </BrowserRouter>
  );
};

export default hot(module)(App);
