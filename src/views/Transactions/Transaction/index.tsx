import React, { useState } from 'react';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import DeleteIcon from '@material-ui/icons/Delete';

import { ITransaction } from 'controllers/api/resources/transactions';

import MoreDialog from './MoreDialog';

import { useStyles } from './styles';


interface IProps {
  data: ITransaction;
}

const Transaction: React.FC<IProps> = ({ data }) => {
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
  const [openMore, setOpenMore] = useState(false);
  const openDialog = () => {
    setOpenMore(true);
  };
  const closeDialog = () => {
    setOpenMore(false);
  };
  const handleSave = (data: ITransaction) => {
    // TODO: connect to store
    closeDialog();
  };
  
  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Typography variant="h5" component="h2" className={classes.name}>{name}</Typography>
        <Typography className={classes.datetime} color="textSecondary" gutterBottom>
          {updatedAt}
        </Typography>
        {description && (
          <>
            <Divider />
            <Typography variant="body2" component="p" className={classes.description}>
              {description}
            </Typography>
            <Divider />
          </>
        )}
        {categories.length > 0 && (
          <ul className={classes.categories}>
            {categories.map(c => (
              <li key={c.id}>
                <Chip
                  size="small"
                  label={c.name}
                  color="primary"
                  variant="outlined"
                />
              </li>
            ))}
          </ul>
        )}
      </CardContent>
      <CardActions className={classes.cardButtons}>
        <Button color="primary" onClick={openDialog}>Learn More</Button>
        <IconButton aria-label="delete" color="secondary" size="small">
          <DeleteIcon />
        </IconButton>
      </CardActions>
      <MoreDialog
        open={openMore}
        data={data}
        loading
        onSave={handleSave}
        onCancel={closeDialog}
      />
    </Card>
  );
};


export default Transaction;
