import React from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import './App.css';

import Scores from './components/Scores';
import Survey from './components/Survey';

// to scores
import index_data from './data/index_scatterplot.json';
import index_comps from './data/index_components.json';
import score_meta from './data/score_meta.json';
// to survey
import cws_data from './data/cws_indicators.json';

const App = () => {


  return (
    <div className="App">
      <Router>
        <ul>
          <li>
            <NavLink to='/scores'>Index scores</NavLink>
          </li>
          <li>
            <NavLink to='/survey'>Wellbeing indicators</NavLink>
          </li>
        </ul>

        <Switch>
          <Route path='/scores'>
            <Scores
              index_data={ index_data }
              index_comps={ index_comps }
              meta={ score_meta }
            />
          </Route>
          <Route path='/survey'>
            <Survey
              cws_data={ cws_data }
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

//////////////////


export default App;
