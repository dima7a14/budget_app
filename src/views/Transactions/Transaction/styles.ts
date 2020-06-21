import { makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 240,
  },
  datetime: {
    fontSize: 12,
  },
  categories: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    listStyle: 'none',
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    paddingLeft: 0,
    paddingRight: 0,
    margin: 0,
    '& > li': {
      marginLeft: theme.spacing(0.5),
      '&:first-child': {
        marginLeft: 0,
      },
    },
  },
  description: {
    padding: theme.spacing(1),
  },
}));
