import { makeStyles } from '@material-ui/core/styles';

const transition = 'all 500ms';
const slide = '100px';
const formWidth = 300;

export const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(0, 2),
      padding: theme.spacing(2),
    },
    [theme.breakpoints.up('sm')]: {
      left: `calc(50% - ${formWidth / 2}px)`,
      maxWidth: formWidth,
      padding: theme.spacing(2),
    },
  },
  avatar: {
    [theme.breakpoints.down('sm')]: {
      margin: 0,
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(1),
      width: theme.spacing(5),
      height: theme.spacing(5),
    },
  },
  signInAvatar: {
    backgroundColor: theme.palette.warning.light,
  },
  signUpAvatar: {
    backgroundColor: theme.palette.success.main,
  },
  form: {
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(2, 0, 1),
    },
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
  forms: {
    transformStyle: 'preserve-3d',
    position: 'relative',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  signInEnter: {
    opacity: 0,
    transform: `translate(-${slide})`,
  },
  signInEnterActive: {
    opacity: 1,
    transform: 'translate(0)',
    transition,
  },
  signInExit: {
    opacity: 1,
    transform: 'translate(0)',
  },
  signInExitActive: {
    opacity: 0,
    transform: `translate(-${slide})`,
    transition,
  },
  signUpEnter: {
    opacity: 0,
    transform: `translate(${slide})`,
  },
  signUpEnterActive: {
    opacity: 1,
    transform: 'translate(0)',
    transition,
  },
  signUpExit: {
    opacity: 1,
    transform: 'translate(0)',
  },
  signUpExitActive: {
    opacity: 0,
    transform: `translate(${slide})`,
    transition,
  },
  overlay: {
    width: '100%',
    height: '100%',
    zIndex: 2,
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
