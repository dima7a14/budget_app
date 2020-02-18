import React from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import HomeIcon from '@material-ui/icons/Home';
import NotificationsIcon from '@material-ui/icons/Notifications';
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
    icon: <HomeIcon />,
    link: routes.home.path
  },
  {
    icon: <NotificationsIcon />,
    link: routes.transactions.path,
  },
];

const BaseLayout: React.FC = ({ children }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <div className={classes.leftNavigation}>
        <div className={classes.avatarBlock}></div>
        {menuItems.map(i => (
          <IconButton onClick={() => history.push(i.link)}>
            {i.icon}
          </IconButton>
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
