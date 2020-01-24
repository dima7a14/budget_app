import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Routes } from 'router';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes />
      </div>
    </BrowserRouter>
  );
};

export default App;
