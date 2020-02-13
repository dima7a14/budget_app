import { createUseStyles } from 'react-jss';

export const coeffs = [0.15, 0.6, 0.125, 0.125];

export const rowHeight = 30;

export const useStyles = createUseStyles({
  cell: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
  },
  fullWidthCell: {
    '& > div': {
      width: '100%',
    },
  },
});
