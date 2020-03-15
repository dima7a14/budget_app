import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import find from 'lodash/find';
import Container from '@material-ui/core/Container';

import routes from 'router/routes';

import { setAccounts } from 'stores/accounts';

import Header from './Header';
import Sidebar from './Sidebar';
import { useStyles } from './styles';

const accounts = {
  one: {
    id: 'one',
    name: 'Account one',
    currency: 'UAN',
  },
  two: {
    id: 'two',
    name: 'Account two',
    currency: 'EUR',
  },
  three: {
    id: 'three',
    name: 'Account three',
    currency: 'USD'
  },
};


const BaseLayout: React.FC = ({ children }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      setAccounts(accounts);
      setLoading(false);
    }
  });

  const [open, setOpen] = useState(false);
  const handleSidebarStatus = () => {
    setOpen(!open);
  };
  const location = useLocation();
  const currentPage = find(routes, r => r.path === location.pathname);
  if (loading) {
    return null;
  }

  return (
    <div className={classes.root}>
      <Header
        opened={open}
        title={currentPage ? currentPage.title : ''}
        onToggle={handleSidebarStatus}
      />
      <Sidebar open={open} onToggle={handleSidebarStatus} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {children}
        </Container>
      </main>
    </div>
  );
};

export default BaseLayout;
