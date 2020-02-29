import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Avatar from '@material-ui/core/Avatar';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import ViewCompactIcon from '@material-ui/icons/ViewCompact';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import routes from 'router/routes';
import { useStyles } from './styles';


const menuItems = [
  {
    icon: <ViewCompactIcon htmlColor="#3b3b3b" />,
    text: routes.transactions.title,
    link: routes.transactions.path,
    enabled: true,
  },
  {
    icon: <AccountBalanceWalletIcon htmlColor="#3b3b3b" />,
    text: routes.accounts.title,
    link: routes.accounts.path,
    enabled: true,
  },
  {
    icon: <EqualizerIcon htmlColor="#3b3b3b" />,
    text: routes.reports.title,
    link: routes.reports.path,
    enabled: true,
  },
];

interface IProps {
  open: boolean;
  onToggle(): void;
}

const Sidebar: React.FC<IProps> = ({ open, onToggle }) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  return (
    <Drawer
      open={open}
      variant="permanent"
      classes={{
        paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
    >
      <div className={classes.toolbar}>
        <Avatar className={classes.avatar}>U</Avatar>
        <IconButton onClick={onToggle}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        {menuItems.map(i => (
          <ListItem
            key={i.link}
            button
            selected={i.link === location.pathname}
            onClick={() => history.push(i.link)}
            disabled={!i.enabled}
          >
            <ListItemIcon>{i.icon}</ListItemIcon>
            <ListItemText primary={i.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
