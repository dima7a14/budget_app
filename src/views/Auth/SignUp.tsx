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
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import routes from 'router/routes';

import { useStyles } from './styles';


interface IProps {
  loading: boolean;
  onSubmit(params: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): any;
}

const SignUp: React.FC<IProps> = ({ loading, onSubmit }) => {
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      userName: '',
      email: '',
      password: '',
    },
    onSubmit: ({ userName, email, password }) => {
      const [firstName, lastName] = userName.split(' ');

      onSubmit({ email, password, firstName, lastName });
    },
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
          id="userName"
          label="Username"
          name="userName"
          autoComplete="username"
          autoFocus
          value={formik.values.userName}
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
