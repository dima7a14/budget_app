import React from 'react';
import { withSnackbar, WithSnackbarProps } from 'notistack';

import { IMessage } from 'stores/global/app';


interface IProps extends WithSnackbarProps {
  message?: IMessage;
}

class SystemSnackbar extends React.PureComponent<IProps> {
  static defaultProps = {
    message: undefined,
  };

  componentDidUpdate() {
    if (typeof this.props.message !== 'undefined') {
      this.props.enqueueSnackbar(this.props.message.text, { variant: this.props.message.variant });
    }
  }

  render() {
    return this.props.children;
  }
}

export default withSnackbar(SystemSnackbar);
