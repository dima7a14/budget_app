import { createUseStyles } from 'react-jss';
import { Classes } from '@blueprintjs/core';

export const useStyles = createUseStyles({
  selectPopover: {
    [`& .${Classes.MENU}`]: {
      maxHeight: 300,
      overflow: 'auto',
    },
  },
});
