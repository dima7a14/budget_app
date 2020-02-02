import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  FormGroup,
  InputGroup,
  Button,
  Icon,
} from '@blueprintjs/core';
import classNames from 'classnames';

import { paths } from 'router';

import { useStyles } from './styles';

interface IProps {
  className?: string;
}

const SignUpForm: React.FC<IProps> = props => {
  const { className } = props;
  const classes = useStyles();
  const firstInputEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (firstInputEl.current) {
      firstInputEl.current.focus();
    }
  }, []);

  return (
    <section className={classNames(classes.container, className)}>
      <header className={classes.header}>
        <h3 className={classes.title}>Sign Up</h3>
      </header>
      <div className={classes.body}>
        <FormGroup
          label="Full name"
          className={classes.formGroup}
        >
          <InputGroup
            leftIcon="person"
            type="text"
            large
            // @ts-ignore TODO: maybe problem in library type.
            inputRef={firstInputEl}
          />
        </FormGroup>
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
          <Link to={paths.signIn.path}>
            <Icon icon="arrow-left" />
            <span className={classes.linkText}>Sign In</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SignUpForm;
