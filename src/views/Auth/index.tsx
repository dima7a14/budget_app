import React from 'react';
import { useLocation } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import Grow from '@material-ui/core/Grow';
import Zoom from '@material-ui/core/Zoom';
import Paper from '@material-ui/core/Paper';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import routes from 'router/routes';

import SignIn from './SignIn';
import SignUp from './SignUp';
import { useStyles } from './styles';

const Auth: React.FC = () => {
  const classes = useStyles();
  const location = useLocation();

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={4} className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Zoom in={location.pathname === routes.signIn.path}>
          <SignIn />
        </Zoom>
        <Zoom in={location.pathname === routes.signUp.path}>
          <SignUp />
        </Zoom>
      </Paper>
    </Container>
  );
};

export default Auth;
