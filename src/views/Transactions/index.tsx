import React from 'react';

import DefaultLayout from 'layouts/Default';

import Table from './Table';

const Transactions: React.FC = () => {
  return (
    <DefaultLayout>
      <Table />
    </DefaultLayout>
  );
};

export default Transactions;
