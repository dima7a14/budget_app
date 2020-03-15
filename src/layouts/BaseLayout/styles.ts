import { makeStyles } from '@material-ui/core/styles';

import { sidebarWidth } from 'theme/dimensions';

export const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: '100vh',
    background: '#f5f5f5',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));
