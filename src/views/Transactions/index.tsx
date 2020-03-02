import React, { useEffect } from 'react';

import Transaction from './Transaction';
// import DefaultLayout from 'layouts/Default';

// import Table from './Table';

// const Transactions: React.FC = () => {
//   return (
//     <DefaultLayout>
//       <Table />
//     </DefaultLayout>
//   );
// };

const transactions = [{
  id: '1',
  account: 'one',
  categories: [],
  amount: 24.25
}, {
  id: '2',
  account: 'two',
  categories: [],
  amount: 0.5
}, {
  id: '3',
  account: 'three',
  categories: [],
  amount: 69
}];

const Transactions: React.FC = () => {
  useEffect(() => {
    // todo add load of transactions
  });

  return (
    <div>
      Transactions
      {transactions.map(t => (
        <Transaction key={t.id} transaction={t} />
      ))}
    </div>
  );
};

export default Transactions;
