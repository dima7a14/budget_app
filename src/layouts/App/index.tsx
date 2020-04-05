import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { useStore } from 'effector-react';
import { SnackbarProvider } from 'notistack';
import CssBaseline from '@material-ui/core/CssBaseline';
import Slide from '@material-ui/core/Slide';

import globalStore from 'stores/global';

import { Routes } from 'router';

import SystemSnackbar from './SystemSnackbar';
import BaseLayout from '../BaseLayout';


const App: React.FC = () => {
  const appStore = useStore(globalStore.app.$store);

  return (
    <BrowserRouter>
      <SnackbarProvider
        maxSnack={3}
        TransitionComponent={transitionProps => <Slide {...transitionProps} direction="up" />}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <CssBaseline />
        <SystemSnackbar message={appStore.message}>
          <BaseLayout>
            <Routes />
          </BaseLayout>
        </SystemSnackbar>
      </SnackbarProvider>
    </BrowserRouter>
  );
}

export default hot(module)(App);
