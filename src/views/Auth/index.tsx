import React from 'react';
import { useLocation } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import routes from 'router/routes';

import SignIn from './SignIn';
import SignUp from './SignUp';
import { useStyles } from './styles';

const Auth: React.FC = () => {
  const location = useLocation();
  const classes = useStyles();

  console.log('path', location.pathname)

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
        <SignIn />
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
        <SignUp />
      </CSSTransition>
    </div>
  );
};

export default Auth;
