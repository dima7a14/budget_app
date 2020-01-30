import { Colors } from '@blueprintjs/core';
import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  defaultLayout: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'flex-end',
    height: '100%',
    background: 'linear-gradient(120deg, #e8f8b6 2%, #e5e5e5 100%)',
  },
  content: {
    flexGrow: 1,
    overflow: 'auto',
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
  },
  footer: {
    backgroundColor: Colors.DARK_GRAY2,
    padding: '.5rem',
    textAlign: 'center',
    color: Colors.WHITE,
    fontSize: 12,
    lineHeight: '1.5em',
  },
});
