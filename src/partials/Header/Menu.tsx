import React from 'react';
import { Menu, MenuItem, MenuDivider } from '@blueprintjs/core';

const HeaderMenu: React.FC = () => (
  <Menu>
    <MenuItem text="Account" icon="user" />
    <MenuItem text="Family" icon="home" />
    <MenuDivider />
    <MenuItem text="Log out" icon="log-out" />
  </Menu>
);

export default HeaderMenu;
