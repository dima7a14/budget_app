import React from 'react';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';

import { ITransaction } from 'controllers/api/resources/transactions';

import { useStyles } from './styles';


interface IProps {
  data: ITransaction;
}

const Transaction: React.FC<IProps> = ({ data }) => {
  const { id, name, description, updatedAt, value, accountId, createdById, categories } = data;
  const classes = useStyles();
  
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">{name}</Typography>
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
      </CardContent>
      <CardActions>
        <Button size="small">More</Button>
      </CardActions>
    </Card>
  );
};


export default Transaction;
