import React from 'react';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import routes from 'router/routes';

import api from 'controllers/api';

import { useStyles } from './styles';


const SignUp: React.FC = () => {
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    onSubmit: ({ username, email, password }) => {
      const [firstName, lastName] = username.split(' ');

      api.auth.register(email, password, firstName, lastName);
    },
  });

  return (
    <Paper elevation={4} className={classes.paper}>
      <Avatar className={classes.signUpAvatar}>
        <AccountCircleIcon />
      </Avatar>
      <Typography component="h2" variant="h5">
        Sign up
      </Typography>
      <form className={classes.form} onSubmit={formik.handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
          value={formik.values.username}
          onChange={formik.handleChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign up
        </Button>
        <Grid container>
          <Grid item xs>
            <Link to={routes.signIn.path} className={classes.link}>
              Already have an account? Sign In
            </Link>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default SignUp;
