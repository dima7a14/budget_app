import React from 'react';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import _ from 'lodash';
import classNames from "classnames";
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import HomeIcon from '@material-ui/icons/Home';
import ListIcon from '@material-ui/icons/List';
import Avatar from "@material-ui/core/Avatar";

import routes from 'router/routes';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: '100vh',
    background: '#f5f5f5',
  },
  leftNavigation: {
    width: '72px',
    background: '#fff',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  avatarBlock: {
    height: 80,
    paddingTop: 12,
  },
  menuIcon: {
    padding: '4px 0',
    width: '100%',
    height: 48,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    '&:hover': {
      background: '#efefef',
    },
  },
  menuIconActive: {
    background: '#dedede',
  },
  topNavigation: {},
  title: {
    flexGrow: 1,
  },
  toolbar: {
    paddingRight: 24,
  },
  content: {
    flexGrow: 1,
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

const menuItems = [
  {
    icon: <HomeIcon htmlColor="#3b3b3b" />,
    link: routes.home.path
  },
  {
    icon: <ListIcon htmlColor="#3b3b3b" />,
    link: routes.transactions.path,
  },
];

const BaseLayout: React.FC = ({ children }) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  return (
    <div className={classes.root}>
      <div className={classes.leftNavigation}>
        <div className={classes.avatarBlock}>
          <Avatar />
        </div>
        {menuItems.map(i => (
          <div
            key={i.link}
            onClick={() => history.push(i.link)}
            className={classNames(
              classes.menuIcon,
              { [classes.menuIconActive]: location.pathname === i.link}
            )}
          >
            {i.icon}
          </div>
        ))}
      </div>
      <div>
        <div className={classes.topNavigation}>
          <Toolbar className={classes.toolbar}>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              <Switch>
                {_.map(routes, p => (
                  <Route>
                    {p.title}
                  </Route>
                ))}
              </Switch>
            </Typography>
          </Toolbar>
        </div>
        <main className={classes.content}>
          <Container maxWidth="lg" className={classes.container}>
            {children}
          </Container>
        </main>
      </div>
    </div>
  );
};

export default BaseLayout;
