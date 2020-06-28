import React from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Divider,
  Select,
  Chip,
  LinearProgress,
} from '@material-ui/core';

import { ITransaction } from 'controllers/api/resources/transactions';

import { useStyles } from './styles';


interface IProps {
  open: boolean;
  data: ITransaction;
  loading: boolean;
  onSave(data: ITransaction): void;
  onCancel(): void;
}

const MoreDialog: React.FC<IProps> = props => {
  const { open, data, onSave, onCancel, loading } = props;
  const {
    id,
    name,
    read,
    description,
    updatedAt,
    value,
    accountId,
    createdById,
    categories,
  } = data;
  const classes = useStyles();
  const save = () => {
    onSave(data); // TODO: add Formik
  };

  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle className={classes.title}>{name}</DialogTitle>
      <DialogContent>
        <Divider />
        <Typography className={classes.datetime} color="textSecondary" gutterBottom>
          {updatedAt}
        </Typography>
        <Typography variant="body2" component="p" className={classes.description}>
          {description}
        </Typography>
        <Divider />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={save}>Save</Button>
        <Button onClick={onCancel}>Cancel</Button>
      </DialogActions>
      <LinearProgress color="primary" />
    </Dialog>
  );
};

export default MoreDialog;
