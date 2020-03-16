import React, { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { useStoreMap } from 'effector-react';

import routes from 'router/routes';

import { user } from 'stores/global';
import { IRegisterData } from 'stores/global/user';

import SignIn from './SignIn';
import SignUp from './SignUp';
import { useStyles } from './styles';

const Auth: React.FC = () => {
  const location = useLocation();
  const classes = useStyles();
  const isLoading = useStoreMap({
    store: user.$store,
    keys: [],
    fn: (u, []) => u.loading,
  });
  const login = useCallback(async (params: { email: string, password: string }) => {
    await user.api.login(params);
    await user.api.get();
  }, []);
  const register = useCallback(async (params: IRegisterData) => {
    await user.api.register(params);
    await user.api.get();
  }, []);

  return (
    <div className={classes.forms}>
      <CSSTransition
        in={location.pathname === routes.signIn.path}
        unmountOnExit
        timeout={500}
        classNames={{
          enter: classes.signInEnter,
          enterActive: classes.signInEnterActive,
          exit: classes.signInExit,
          exitActive: classes.signInExitActive,
        }}
      >
        <SignIn loading={isLoading} onSubmit={login} />
      </CSSTransition>
      <CSSTransition
        in={location.pathname === routes.signUp.path}
        unmountOnExit
        timeout={500}
        classNames={{
          enter: classes.signUpEnter,
          enterActive: classes.signUpEnterActive,
          exit: classes.signUpExit,
          exitActive: classes.signUpExitActive,
        }}
      >
        <SignUp loading={isLoading} onSubmit={register} />
      </CSSTransition>
    </div>
  );
};

export default Auth;
