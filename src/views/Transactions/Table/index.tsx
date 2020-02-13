import React, { useState } from 'react';
import {
  Column,
  EditableCell,
  Table,
  Cell,
} from '@blueprintjs/table';
import classNames from 'classnames';

import DateCell from './cells/DateCell';
import PriceCell from './cells/PriceCell';
import { useStyles, coeffs, rowHeight } from './styles';
import DATA from './MOCK_DATA.json';

interface IItem { // TODO: temporary item schema.
  id: number;
  name: string;
  description: string;
  category: number;
  date: string;
  price: number;
  currency: string;
}

const TransactionsTable: React.FC = () => {
  const classes = useStyles();
  const [widths, setWidths] = useState<number[]>(coeffs.map(c => (window.innerWidth - 30) * c));

  const updateColWidth = (index: number, size: number) => {
    const newWidths = [...widths.slice(0, index), size, ...widths.slice(index + 1)];
    
    setWidths(newWidths);
  };

  const renderName = (row: number) => (
    <EditableCell
      value={DATA[row].name}
      tooltip={DATA[row].name}
      className={classes.cell}
    />
  );

  const renderDescription = (row: number) => (
    <EditableCell
      value={DATA[row].description}
      editableTextProps={{ multiline: true }}
      tooltip={DATA[row].description}
      className={classes.cell}
    />
  );

  const renderDate = (row: number) => (
    <Cell className={classNames(classes.cell, classes.fullWidthCell)}>
      <DateCell value={DATA[row].date} onChange={() => null} />
    </Cell>
  );

  const renderPrice = (row: number) => (
    <Cell className={classNames(classes.cell, classes.fullWidthCell)}>
      <PriceCell
        value={parseFloat(DATA[row].price)}
        currency={DATA[row].currency}
        onChange={() => null}
      />
    </Cell>
  );

  return (
    <Table
      enableRowResizing
      enableColumnResizing
      numRows={1000}
      defaultRowHeight={rowHeight}
      columnWidths={widths}
      onColumnWidthChanged={updateColWidth}
    >
      <Column name="Title" cellRenderer={renderName} />
      <Column name="Description" cellRenderer={renderDescription} />
      <Column name="Date" cellRenderer={renderDate} />
      <Column name="Price" cellRenderer={renderPrice} />
    </Table>
  );
};

export default TransactionsTable;
