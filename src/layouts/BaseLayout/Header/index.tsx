import React from 'react';
import classNames from 'classnames';
import { useStore } from 'effector-react';

import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import MenuIcon from '@material-ui/icons/Menu';

import { user } from 'stores/global';

import SettingsButton from './Settings';
import { useStyles } from './styles';


interface IProps {
  opened: boolean;
  title: string;
  onToggle(): any;
}

const Header: React.FC<IProps> = ({ opened, title, onToggle }) => {
  const classes = useStyles();
  const userStore = useStore(user.$store);
  const isAuthenticated = Boolean(userStore.refreshToken);

  return (
    <AppBar
        position="absolute"
        className={classNames(classes.appBar, isAuthenticated && opened && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          {isAuthenticated && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="Open sidebar"
              onClick={onToggle}
              className={classNames(classes.menuButton, opened && classes.menuButtonHidden)}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            {isAuthenticated ? title : 'Simple Budget App'}
          </Typography>
          <SettingsButton />
        </Toolbar>
      </AppBar>
  );
};

export default Header;
