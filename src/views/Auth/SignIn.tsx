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
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import routes from 'router/routes';

import PasswordField from 'components/PasswordField';

import { useStyles } from './styles';


interface IProps {
  loading: boolean;
  onSubmit(params: { email: string, password: string, remember: boolean }): any;
}

const SignIn: React.FC<IProps> = ({ loading, onSubmit }) => {
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: false,
    },
    onSubmit,
  });

  return (
    <Paper elevation={4} className={classes.paper}>
      <Fade
        in={loading}
        timeout={500}
      >
        <div className={classes.overlay}>
          <CircularProgress />
        </div>
      </Fade>
      <Avatar className={classes.signInAvatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h2" variant="h5">
        Sign in
      </Typography>
      <form className={classes.form} onSubmit={formik.handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <PasswordField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
          name="remember"
          id="remember"
          onChange={formik.handleChange}
          value={formik.values.remember}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link to={routes.signUp.path} className={classes.link}>
              Don't have an account? Sign Up
            </Link>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default SignIn;
