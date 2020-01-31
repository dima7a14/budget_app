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
    <DefaultLayout>
      <CSSTransition
        in={openedForm === EForms.signIn}
        timeout={1000}
        unmountOnExit={false}
        classNames={{
          enter: classes.formEnter,
          enterActive: classes.formEnterActive,
          exit: classes.formExit,
          exitActive: classes.formExitActive,
        }}
      >
        <SignInForm className={classes.form} toggle={() => setOpenedForm(openedForm === EForms.signIn ? EForms.signUp : EForms.signIn)} />
      </CSSTransition>
      {/* <CSSTransition
        in={openedForm === EForms.signUp}
        timeout={500}
        unmountOnExit
        classNames={{
          enter: classes.formEnter,
          enterActive: classes.formEnterActive,
          exit: classes.formExit,
          exitActive: classes.formExitActive,
        }}
      >
        <SignUpForm toggle={() => setOpenedForm(EForms.signIn)} />
      </CSSTransition> */}
    </DefaultLayout>
  );
};

export default Auth;
