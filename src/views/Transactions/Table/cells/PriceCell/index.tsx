import React, { useMemo } from 'react';
import {
  ControlGroup,
  NumericInput,
  Button,
} from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';
import { Popover } from '@blueprintjs/core';
import { codes as getCodes } from 'currency-codes';
import getSymbolFromCurrency from 'currency-symbol-map';

import { renderCurrency, filterCurrency } from './utils';
import { useStyles } from './styles';


interface IProps {
  value: number;
  currency: string;
  onChange(price: number, currency: string): void;
}

const CurrencySelect = Select.ofType<string>();

const PriceCell: React.FC<IProps> = ({ value, currency, onChange }) => {
  const classes = useStyles();
  const formattedValue = useMemo(() =>
    new Intl.NumberFormat(undefined, { style: 'currency', currency }), [currency]).format(value);
  const codes = useMemo(() => getCodes(), []);


  return (
    <Popover
      content={
        <ControlGroup>
          <NumericInput value={value} />
          <CurrencySelect
            items={codes}
            itemPredicate={filterCurrency}
            itemRenderer={renderCurrency}
            onItemSelect={() => null}
            popoverProps={{ popoverClassName: classes.selectPopover }}
          >
            <Button
              rightIcon="caret-down"
              text={getSymbolFromCurrency(currency) || 'No selection'}
            />
          </CurrencySelect>
          <Button intent="primary" icon="small-tick" />
        </ControlGroup>
      }
      fill
    >
      {formattedValue}
    </Popover>
  );
};

export default PriceCell;
