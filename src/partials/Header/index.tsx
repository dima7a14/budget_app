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

import Menu from './Menu';
import { useStyles } from './styles';

const Header: React.FC = () => {
  const classes = useStyles();

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
          <Button icon="th" text="Transactions" />
          <Button icon="form" text="Tasks" disabled />
          <Button icon="timeline-area-chart" text="Statistics" disabled />
          <Popover content={<Menu />}>
            <Button icon="cog" />
          </Popover>
        </ButtonGroup>
      </NavbarGroup>
    </Navbar>
  );
};

export default Header;
