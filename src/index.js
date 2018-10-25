import 'core-js/es6';
import React from 'react';
import { render } from 'react-dom';
import App from './components/App/App';
import './style.css';
import 'react-loading-bar/dist/index.css';

import { RegisterStyles } from './config/styles';

RegisterStyles();

render(<App />, document.getElementById('root'));
