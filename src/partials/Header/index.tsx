import React from 'react';
import {
  Navbar,
  NavbarGroup,
  NavbarDivider,
  NavbarHeading,
  ButtonGroup,
  Button
} from '@blueprintjs/core';

import styles from './styles.module.scss';

const Header: React.FC = () => {
  return (
    <Navbar className={styles.header} fixedToTop>
      <NavbarGroup align="left">
        <NavbarHeading>Family Budget App</NavbarHeading>
        <NavbarDivider />
      </NavbarGroup>
      <NavbarGroup align="right">
        <ButtonGroup fill large>
          <Button icon="th" text="Transactions" />
        </ButtonGroup>
      </NavbarGroup>
    </Navbar>
  );
};

export default Header;
