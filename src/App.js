import React, { useState } from 'react';
import { Switch, Route, Redirect, useLocation, useHistory } from 'react-router-dom';
import { objToArray, filterByString, filterTownLvl } from './utils/utils.js';
import Dash from './components/Dash';
// import ErrorBoundary from './components/ErrorBoundary';

import './App.css';

import Home from './pages/Home';
import Scores from './pages/Scores';
import Survey from './pages/Survey';
import Risks from './pages/Risks';
import Chime from './pages/Chime';
import Internet from './pages/Internet';
import Resources from './pages/Resources';

import Header from './components/Header';
import { NoteContext } from './utils/NoteContext.js';

import data from './data/dash_data.json';
import front from './data/front_data.json';
import meta from './data/meta.json';
import page_meta from './data/page_meta.json';
import town_topo from './data/town_topo.json';

const hdrs = {
  'home': 'Home',
  survey: 'Wellbeing indicators',
  risks: 'Health risks by town',
  scores: 'Index scores',
  chime: 'Hospital encounters',
  internet: 'Internet access',
  resources: 'Resources'
};

const pages = Object.keys(hdrs);
const p0 = pages[0];

const usePageInfo = () => {
  console.log(useLocation());
  const history = useHistory();
  const location = useLocation().pathname.substring(1);
  console.log(location);
  if (location.length && pages.indexOf(location) === -1) {
    history.push('/' + p0);
  }
  return {
    location,
    display: hdrs[location],
    ...page_meta[location]
  };
};

const App = () => {
  const pg = usePageInfo();

  const [noteOpen, setNoteOpen] = useState(true);
  const handleClose = () => {
    setNoteOpen(!noteOpen);
  };

  return (
    <div className="App">
      <Header hdrs={ objToArray(hdrs, 'location', 'title') } />

      <NoteContext.Provider value={ { noteOpen, handleClose } }>
        <Dash
          note={ page_meta['covid'].intro.text }
          { ...pg }
        >
          <Switch>
            <Route exact path='/' render={ () => <Redirect to='/home' /> } />
            <Route exact path='/home'>
              <Home
                data={ front }
                hdrs={ hdrs }
              />
            </Route>
            <Route exact path='/survey'>
              <Survey
                data={ data['cws_indicators'] }
                meta={ meta['cws'] }
              />
            </Route>
            <Route exact path='/risks'>
              <Risks
                data={ data['cws_health_by_town'] }
                meta={ filterTownLvl(filterByString(meta['cws'], 'health')) }
                shape={ town_topo }
              />
            </Route>
            <Route exact path='/scores'>
              <Scores
                data={ data['index_scatterplot'] }
                index_comps={ data['index_components'] }
                meta={ meta['score'] }
              />
            </Route>
            <Route exact path='/chime'>
              <Chime
                data={ data['chime_data'] }
                meta={ meta['chime'] }
                shape={ town_topo }
              />
            </Route>
            <Route exact path='/internet'>
              <Internet
                data={ data['internet'] }
                meta={ meta['internet'] }
                shape={ town_topo }
              />
            </Route>
            <Route exact path='/resources'>
              <Resources
                { ...page_meta['resources'].li }
              />
            </Route>
          </Switch>
        </Dash>
      </NoteContext.Provider>
    </div>
  );
};

//////////////////

export default App;
