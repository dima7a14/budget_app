import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  title: {
    paddingBottom: 0,
  },
  datetime: {
    marginTop: theme.spacing(2),
    fontSize: 12,
  },
  description: {
    marginBottom: theme.spacing(2),
  },
}));
