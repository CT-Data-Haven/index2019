import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, useLocation } from 'react-router-dom';

import './App.css';

import Header from './components/Header';
import Scores from './components/Scores';
import Survey from './components/Survey';
import Footer from './components/Footer';

// to scores
import index_data from './data/index_scatterplot.json';
import index_comps from './data/index_components.json';
import score_meta from './data/score_meta.json';
// to survey
import cws_data from './data/cws_indicators.json';
import cws_meta from './data/cws_meta.json';
import dl_meta from './data/downloads.json';

// const downloads = {
//   scores: 'index_scores_2019',
//   survey: 'cws_survey_2018'
// };
const hdrs = {
  scores: 'Index scores',
  survey: 'Wellbeing indicators'
};

const useDownload = () => {
  const location = useLocation().pathname.substring(1);
  return {
    location: location,
    urls: dl_meta[location],
    dw: 'https://data.world/camille86/cws2018',
    display: hdrs[location]
  };
};

const App = () => {
  const download = useDownload();
  return (
    <div className="App">
      <Header hdrs={ hdrs } />

      <Switch>
        <Route exact path='/' render={ () => <Redirect to='/scores' /> } />
        <Route exact path='/scores'>
          <Scores
            index_data={ index_data }
            index_comps={ index_comps }
            meta={ score_meta }
          />
        </Route>
        <Route exact path='/survey'>
          <Survey
            cws_data={ cws_data }
            meta={ cws_meta }
          />
        </Route>

      </Switch>
      { download.location.length ? <Footer { ...download } /> : null }

    </div>
  );
};

//////////////////


export default App;
