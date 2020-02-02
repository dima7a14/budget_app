import { Colors } from '@blueprintjs/core';
import { createUseStyles } from 'react-jss';

const transition = 'all 1000ms';
const slide = '100px';
const formWidth = 320;

export const useStyles = createUseStyles({
  container: {
    width: formWidth,
    border: `1px solid ${Colors.LIGHT_GRAY1}`,
    borderRadius: 10,
    backgroundColor: Colors.WHITE,
    overflow: 'hidden',
  },
  header: {
    padding: '.5rem',
    backgroundColor: Colors.LIGHT_GRAY4,
    textAlign: 'center',
  },
  title: {
    margin: 0,
    fontWeight: 500,
    fontSize: '150%',
    color: Colors.DARK_GRAY3,
  },
  body: {
    padding: '1rem',
  },
  formGroup: {
    marginBottom: '2rem',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  linkText: {
    margin: '0 .5em',
  },
  forms: {
    transformStyle: 'preserve-3d',
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  form: {
    position: 'absolute',
    left: `calc(50% - ${formWidth / 2}px)`,
    top: '20%',
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
});
