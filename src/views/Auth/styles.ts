import { Colors } from '@blueprintjs/core';
import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  container: {
    minWidth: 320,
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
  },
  form: {
    transformStyle: 'preserve-3d',
    transition: 'all 1000ms',
  },
  formEnter: {
    // opacity: 0,
    transform: 'rotateY(0)',
  },
  formEnterActive: {
    // opacity: 1,
    transform: 'rotateY(0)',
    
  },
  formExit: {
    // opacity: 1,
    transform: 'rotateY(180deg)',
  },
  formExitActive: {
    // opacity: 0,
    tranform: 'rotateY(180deg)',
    transition: 'all 1000ms',
  },
});
