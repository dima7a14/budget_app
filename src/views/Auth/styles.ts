import { makeStyles } from '@material-ui/core/styles';

const transition = 'all 500ms';
const slide = '100px';
const formWidth = 300;

export const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(8),
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    left: `calc(50% - ${formWidth / 2}px)`,
    maxWidth: formWidth,
  },
  signInAvatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.warning.light,
  },
  signUpAvatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.success.main,
  },
  form: {
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
  forms: {
    transformStyle: 'preserve-3d',
    position: 'relative',
    width: '100%',
    height: '100%',
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
}));
