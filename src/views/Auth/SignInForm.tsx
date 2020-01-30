import React from 'react';
import { FormGroup, InputGroup, Button } from '@blueprintjs/core';

import { useStyles } from './styles';

interface IProps {
  toggle?(): void;
}

const SignInForm: React.FC<IProps> = props => {
  const { toggle } = props;
  const classes = useStyles();

  return (
    <section className={classes.container}>
      <header className={classes.header}>
        <h3 className={classes.title}>Sign In</h3>
      </header>
      <div className={classes.body}>
        <FormGroup
          label="E-mail"
          className={classes.formGroup}
        >
          <InputGroup leftIcon="envelope" type="email" large />
        </FormGroup>
        <FormGroup
          label="Password"
          className={classes.formGroup}
        >
          <InputGroup leftIcon="key" type="password" large />
        </FormGroup>
        <div className={classes.buttons}>
          <Button text="Submit" large intent="primary" />
          <Button text="Sign Up" large rightIcon="arrow-right" onClick={toggle} />
        </div>
      </div>
    </section>
  );
};

export default SignInForm;
