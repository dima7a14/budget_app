import React from 'react';
import {
  Navbar,
  NavbarGroup,
  NavbarDivider,
  NavbarHeading,
  ButtonGroup,
  Button,
  Popover,
  Classes,
} from '@blueprintjs/core';
import classNames from 'classnames';
import { useHistory, useLocation } from 'react-router-dom';

import { paths } from 'router';

import Menu from './Menu';
import { useStyles } from './styles';

const Header: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  return (
    <Navbar className={classes.header} fixedToTop>
      <NavbarGroup align="left">
        <NavbarHeading>Family Budget App</NavbarHeading>
        <NavbarDivider />
        Balance:
        <h5 className={classNames(Classes.MONOSPACE_TEXT, Classes.TEXT_LARGE, classes.balance)}>$250</h5>
      </NavbarGroup>
      <NavbarGroup align="right">
        <ButtonGroup large>
          <Button
            icon="th"
            text="Transactions"
            onClick={() => history.push(paths.transactions.path)}
            intent={location.pathname === paths.transactions.path ? 'primary' : 'none'}
          />
          <Button
            icon="form"
            text="Tasks"
            disabled
            onClick={() => history.push(paths.tasks.path)}
            intent={location.pathname === paths.tasks.path ? 'primary' : 'none'}
          />
          <Button
            icon="timeline-area-chart"
            text="Statistics"
            disabled
            onClick={() => history.push(paths.statistics.path)}
            intent={location.pathname === paths.statistics.path ? 'primary' : 'none'}
          />
          <Popover content={<Menu />}>
            <Button icon="cog" />
          </Popover>
        </ButtonGroup>
      </NavbarGroup>
    </Navbar>
  );
};

export default Header;
