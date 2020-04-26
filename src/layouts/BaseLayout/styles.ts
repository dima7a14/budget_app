import { makeStyles } from '@material-ui/core/styles';

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
    height: `calc(100% - ${theme.spacing(7)}px)`,
    [theme.breakpoints.up('sm')]: {
      height: `calc(100% - ${theme.spacing(8)}px)`,
    },
  },
}));
