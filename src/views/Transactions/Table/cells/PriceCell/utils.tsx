import React from 'react';
import { MenuItem } from '@blueprintjs/core';
import { ItemRenderer, ItemPredicate } from '@blueprintjs/select';
import getSymbolFromCurrency from 'currency-symbol-map';


export const filterCurrency: ItemPredicate<string> = (query, item, index, exactMatch) => {
  const normalizedItem = item.toLowerCase();
  const normalizedQuery = query.toLowerCase();

  if (exactMatch) {
    return normalizedItem === normalizedQuery;
  }

  return normalizedItem.indexOf(normalizedQuery) >= 0;
};

export const renderCurrency: ItemRenderer<string> = (currency, { handleClick, modifiers, query }) => {
  if (!modifiers.matchesPredicate) {
    return null;
  }

  return (
    <MenuItem
      active={modifiers.active}
      disabled={modifiers.disabled}
      text={currency}
      key={currency}
      onClick={handleClick}
      label={getSymbolFromCurrency(currency)}
    />
  );
};
