import React, {useEffect, useState} from 'react';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import map from 'lodash/map';
import find from 'lodash/find';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import ViewCompactIcon from '@material-ui/icons/ViewCompact';
import Avatar from "@material-ui/core/Avatar";

import routes from 'router/routes';
import { setAccounts } from 'stores/accounts';
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
      <AppBar
        position="absolute"
        className={classNames(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open sidebar"
            onClick={handleSidebarStatus}
            className={classNames(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            {currentPage ? currentPage.title : 'Budget'}
          </Typography>
        </Toolbar>
      </AppBar>
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
