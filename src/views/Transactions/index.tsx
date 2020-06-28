import React from 'react';

import Grid from '@material-ui/core/Grid';

import { ITransaction } from 'controllers/api/resources/transactions';

import Transaction from './Transaction';
import { useStyles } from './styles';

const dataMock: ITransaction[] = [
  {
    id: 1,
    read: false,
    name: 'Transaction 1',
    description: 'My first transaction. WOW! My first transaction. WOW! My first transaction. WOW! My first transaction. WOW! My first transaction. WOW! My first transaction. WOW!',
    createdAt: '2020-02-29T13:35:56.084347Z',
    updatedAt: '2020-02-29T13:35:56.084701Z',
    value: 33,
    accountId: 1,
    createdById: 3,
    categories: [
      { id: 1, name: 'PC' },
    ],
  },
  {
    id: 2,
    read: false,
    name: 'Transaction 2',
    description: '',
    createdAt: '2020-02-29T14:04:21.210568Z',
    updatedAt: '2020-05-02T18:58:53.108372Z',
    value: 19.5,
    accountId: 1,
    createdById: 3,
    categories: [
      { id: 1, name: 'PC' },
      { id: 2, name: 'Electronics' },
    ],
  },
  {
    id: 3,
    read: true,
    name: 'Transaction 3',
    description: 'Very special transaction',
    createdAt: '2020-10-30T06:22:49.210568Z',
    updatedAt: '2020-10-31T10:03:21.210568Z',
    value: 100,
    accountId: 1,
    createdById: 3,
    categories: [],
  },
];

const Transactions: React.FC = () => {
  const classes = useStyles();

  return (
    <Grid container spacing={3} className={classes.root}>
      {dataMock.map(t => (
        <Grid key={t.id} item xs={12} sm={6} md={4} lg={3}>
          <Transaction data={t} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Transactions;
