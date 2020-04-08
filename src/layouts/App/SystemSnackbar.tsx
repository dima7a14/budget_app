import React from 'react';
import { withSnackbar, WithSnackbarProps } from 'notistack';
import isEqual from 'lodash/isEqual';

import { IMessage } from 'stores/global/app';


interface IProps extends WithSnackbarProps {
  message?: IMessage;
}

class SystemSnackbar extends React.PureComponent<IProps> {
  static defaultProps = {
    message: undefined,
  };

  componentDidUpdate(prevProps: IProps) {
    if (
      typeof this.props.message !== 'undefined' &&
      !isEqual(this.props.message, prevProps.message)
    ) {
      this.props.enqueueSnackbar(this.props.message.text, { variant: this.props.message.variant });
    }
  }

  render() {
    return this.props.children;
  }
}

export default withSnackbar(SystemSnackbar);
