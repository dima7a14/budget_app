import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(8),
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.success.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    display: 'block',
    textDecoration: 'none',
    textAlign: 'center',
    color: theme.palette.grey['700'],
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  formEnter: {
    opacity: 0,
  },
  formEnterActive: {
    opacity: 1,
    // transition: theme.transitions.create([''])
  },
}));
