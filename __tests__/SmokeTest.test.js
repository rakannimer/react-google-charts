/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */

import React from 'react';
import ReactDOM from 'react-dom';

import Chart from '../src/index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Chart />, div);
});
