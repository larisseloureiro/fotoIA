import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { findByLabelText } from '@testing-library/react';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

