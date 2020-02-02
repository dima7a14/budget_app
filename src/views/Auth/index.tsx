import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import DefaultLayout from 'layouts/Default';

import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import { useStyles } from './styles';

enum EForms {
  signIn = 'sign_in',
  signUp = 'sign_up',
}

const Auth: React.FC = () => {
  const [openedForm, setOpenedForm] = useState<EForms>(EForms.signIn);
  const classes = useStyles();

  return (
    <>
      <div>
        <button onClick={() => setOpenedForm(openedForm === EForms.signIn ? EForms.signUp : EForms.signIn)}>toggle</button>
      </div>
      <DefaultLayout>
        <div className={classes.forms}>
          <CSSTransition
            in={openedForm === EForms.signIn}
            timeout={1000}
            unmountOnExit
            classNames={{
              enter: classes.signInEnter,
              enterActive: classes.signInEnterActive,
              exit: classes.signInExit,
              exitActive: classes.signInExitActive,
            }}
          >
            <SignInForm className={classes.form} toggle={() => setOpenedForm(EForms.signUp)} />
          </CSSTransition>
          <CSSTransition
            in={openedForm === EForms.signUp}
            timeout={500}
            unmountOnExit
            classNames={{
              enter: classes.signUpEnter,
              enterActive: classes.signUpEnterActive,
              exit: classes.signUpExit,
              exitActive: classes.signUpExitActive,
            }}
          >
            <SignUpForm className={classes.form} toggle={() => setOpenedForm(EForms.signIn)} />
          </CSSTransition>
        </div>
      </DefaultLayout>
    </>
  );
};

export default Auth;
