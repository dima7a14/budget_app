import React from 'react';

import { useStyles } from './styles';

const DefaultLayout: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <section className={classes.defaultLayout}>
      <div className={classes.content}>
        {children}
      </div>
      <footer className={classes.footer}>&copy; Family Budget 2020</footer>
    </section>
  );
};

export default DefaultLayout;
