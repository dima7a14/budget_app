import React, { useCallback } from 'react';
import { DatePicker } from '@blueprintjs/datetime';
import { Popover } from '@blueprintjs/core';
import moment from 'moment';


interface IProps {
  value: string;
  onChange(val: Date): void;
}

const FORMAT = 'YYYY-MM-DD HH:mm';

const DateCell: React.FC<IProps> = ({ value, onChange }) => {
  const formatDate = useCallback((date: Date) => moment(date).format(FORMAT), []);
  const parseDate = useCallback((str: string) => moment(str, FORMAT).toDate(), []);
  const changeDate = useCallback((selectedDate: Date, isUserChange) => {
    if (isUserChange) {
      onChange(selectedDate);
    }
  }, []);

  return (
    <Popover
      content={<DatePicker
        defaultValue={parseDate(value)}
        showActionsBar
        highlightCurrentDay
        onChange={changeDate}
      />}
      fill
    >
      {formatDate(parseDate(value))}
    </Popover>
  );
};

export default DateCell;
