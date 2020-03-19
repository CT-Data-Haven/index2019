import React, { useState } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { objToArray, filterByString, filterTownLvl } from './components/utils.js';

import './App.css';

import Header from './components/Header';
import Scores from './components/Scores';
import Survey from './components/Survey';
import Risks from './components/Risks';
import Footer from './components/Footer';
import { NoteContext } from './components/NoteContext.js';

// to scores
import index_data from './data/index_scatterplot.json';
import index_comps from './data/index_components.json';
import score_meta from './data/score_meta.json';
// to survey
import cws_data from './data/cws_indicators.json';
import cws_meta from './data/cws_meta.json';
import dl_meta from './data/downloads.json';
// to risk by town
import town_data from './data/cws_health_by_town.json';
import town_topo from './data/town_topo.json';
// intros
import intro_txt from './data/intro_text.json';


const hdrs = {
  survey: 'Wellbeing indicators',
  risks: 'Health risks by town',
  scores: 'Index scores'
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
  const [noteOpen, setNoteOpen] = useState(true);
  const handleClose = () => {
    setNoteOpen(false);
  };

  return (
    <div className="App">
      <Header hdrs={ objToArray(hdrs, 'location', 'title') } />

      <Switch>
        <Route exact path='/' render={ () => <Redirect to='/survey' /> } />
        <Route exact path='/survey'>
          <NoteContext.Provider value={ { noteOpen, handleClose } }>
            <Survey
              cws_data={ cws_data }
              meta={ cws_meta }
              intro={ intro_txt }
            />
          </NoteContext.Provider>
        </Route>
        <Route exact path='/risks'>
          <NoteContext.Provider value={ { noteOpen, handleClose } }>
            <Risks
              town_data={ town_data }
              meta={ filterTownLvl(filterByString(cws_meta, 'health')) }
              shape={ town_topo }
              intro={ intro_txt }
            />
          </NoteContext.Provider>
        </Route>
        <Route exact path='/scores'>
          <NoteContext.Provider value={ { noteOpen, handleClose } }>
            <Scores
              index_data={ index_data }
              index_comps={ index_comps }
              meta={ score_meta }
              intro={ intro_txt }
            />
          </NoteContext.Provider>
        </Route>
      </Switch>
      { download.location.length ? <Footer { ...download } /> : null }

    </div>
  );
};

//////////////////


export default App;
