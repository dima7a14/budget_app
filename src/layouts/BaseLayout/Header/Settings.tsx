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

import globalStore from 'stores/global';


const SettingsButton: React.FC = () => {
  const history = useHistory();
  const userStore = useStore(globalStore.user.$store);
  const isAuthenticated = Boolean(userStore.tokens.access);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const toProfile = () => {
    handleClose();
    history.push(routes.profile.path);
  };
  const logout = useCallback(async () => {
    handleClose();
    await globalStore.user.api.logout({ refresh: userStore.tokens.refresh });
    history.push(routes.signIn.path);
  }, [userStore.tokens.refresh]);

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
