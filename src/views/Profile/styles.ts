import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  field: {
    width: 300,
    marginTop: '2em',
  },
  newPasswordField: {
    marginTop: 0,
  },
  buttonsRow: {
    width: 300,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '3em',
  },
});
