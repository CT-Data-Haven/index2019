import React, { useState } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { objToArray, filterByString, filterTownLvl } from './utils/utils.js';
import Dash from './components/Dash';
import ErrorBoundary from './components/ErrorBoundary';

import './App.css';

import Scores from './pages/Scores';
import Survey from './pages/Survey';
import Risks from './pages/Risks';
import Chime from './pages/Chime';
import Internet from './pages/Internet';

import Header from './components/Header';
import { NoteContext } from './utils/NoteContext.js';

import data from './data/dash_data.json';
import meta from './data/meta.json';
import page_meta from './data/page_meta.json';
import town_topo from './data/town_topo.json';

const hdrs = {
  survey: 'Wellbeing indicators',
  risks: 'Health risks by town',
  scores: 'Index scores',
  chime: 'Hospital encounters',
  internet: 'Internet access'
};

const pages = Object.keys(hdrs);
const p0 = pages[0];

const useDownload = () => {
  console.log(useLocation());
  let location = useLocation().pathname.substring(1);
  if (!page_meta[location]) {
    location = p0;
    // TODO: push to history with useHistory
  }
  // if (!page_meta[location]) {
  //     throw new Error('No page meta for location ' + location);
  // } else {
  return {
    location: location,
    // urls: (page_meta[location] ? page_meta[location].download : null),
    urls: page_meta[location].download,
    display: hdrs[location],
    source: (page_meta[location] ? page_meta[location].source : null)
  };
// }
};

const App = () => {
  const download = useDownload();

  const [noteOpen, setNoteOpen] = useState(true);
  const handleClose = () => {
    setNoteOpen(!noteOpen);
  };
  const intro = page_meta[download.location] ? page_meta[download.location].intro : { text: '', headline: '' };

  return (
    <div className="App">
      <Header hdrs={ objToArray(hdrs, 'location', 'title') } />

      <NoteContext.Provider value={ { noteOpen, handleClose } }>
        <Dash
          intro={ intro }
          note={ page_meta['covid'].intro.text }
          download={ download }
        >
          <Switch>
            <Route exact path='/' render={ () => <Redirect to='/survey' /> } />
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
          </Switch>
        </Dash>
      </NoteContext.Provider>
    </div>
  );
};

//////////////////


export default App;
