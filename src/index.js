import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';

import App from './App';
import * as serviceWorker from './serviceWorker';

// import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './index.css';

ReactDOM.render(
  <Router>
    <App />
  </Router>, 
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
