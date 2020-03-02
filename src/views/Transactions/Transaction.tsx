import React from 'react';
import { useStore } from 'effector-react';

import accountsStore from 'stores/accounts';

// todo move from this page
interface TransactionInt {
  id: string;
  amount: number;
  account: string;
  categories: string[];
}

const Transaction: React.FC<{ transaction: TransactionInt }> = ({ transaction }) => {
  const accounts = useStore(accountsStore);
  const currentAccount = accounts.data[transaction.account];

  return (
    <div>
      ammount: {transaction.amount}, currency {currentAccount.currency}
    </div>
  );
};


export default Transaction;
