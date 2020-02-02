import React, { useEffect, useRef } from 'react';
import { FormGroup, InputGroup, Button } from '@blueprintjs/core';
import classNames from 'classnames';

import { useStyles } from './styles';

interface IProps {
  className?: string;
  toggle(): void;
}

const SignInForm: React.FC<IProps> = props => {
  const { toggle, className } = props;
  const classes = useStyles();
  const firstInputEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (firstInputEl.current) {
      firstInputEl.current.focus();
    }
  });

  return (
    <section className={classNames(classes.container, className)}>
      <header className={classes.header}>
        <h3 className={classes.title}>Sign In</h3>
      </header>
      <div className={classes.body}>
        <FormGroup
          label="E-mail"
          className={classes.formGroup}
        >
          <InputGroup
            leftIcon="envelope"
            type="email"
            large
            // @ts-ignore TODO: maybe problem in library type.
            inputRef={firstInputEl}
          />
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
