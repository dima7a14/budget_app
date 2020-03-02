import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import routes from 'router/routes';

import { useStyles } from './styles';


const SignUp: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Typography component="h2" variant="h5">
        Sign up
      </Typography>
      <form className={classes.form} noValidate>
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
    </>
  );
};

export default SignUp;
