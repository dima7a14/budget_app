import React, { useState, useCallback } from 'react';
import { useStore } from 'effector-react';
import { useHistory } from 'react-router-dom';

import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';

import SettingsIcon from '@material-ui/icons/Settings';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import routes from 'router/routes';

import { user } from 'stores/global';


const SettingsButton: React.FC = () => {
  const history = useHistory();
  const userStore = useStore(user.$store);
  const isAuthenticated = Boolean(userStore.token);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const toProfile = () => {
    history.push(routes.profile.path);
    handleClose();
  };
  const logout = useCallback(async () => {
    await user.api.logout({ refresh: userStore.token });
    history.push(routes.signIn.path);
    handleClose();
  }, [userStore.token]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <IconButton
        edge="end"
        color="inherit"
        title="Settings"
        onClick={handleClick}
      >
        <SettingsIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem button divider onClick={toProfile}>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <Typography variant="inherit" align="right">Profile details</Typography>
        </MenuItem>
        <MenuItem button onClick={logout}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <Typography variant="inherit" align="right">Exit</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default SettingsButton;
