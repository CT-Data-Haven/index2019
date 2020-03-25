import React, { useState } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { objToArray, filterByString, filterTownLvl } from './components/utils.js';
import Dash from './components/Dash';

import './App.css';

import Scores from './pages/Scores';
import Survey from './pages/Survey';
import Risks from './pages/Risks';
import Chime from './pages/Chime';

import Header from './components/Header';
import Footer from './components/Footer';
import { NoteContext } from './components/NoteContext.js';

// to scores
import index_data from './data/index_scatterplot.json';
import index_comps from './data/index_components.json';
import score_meta from './data/score_meta.json';
// to survey
import cws_data from './data/cws_indicators.json';
import cws_meta from './data/cws_meta.json';
// to risk by town
import town_data from './data/cws_health_by_town.json';
import town_topo from './data/town_topo.json';
// to chime
import chime_data from './data/chime_data.json';
import chime_meta from './data/chime_meta.json';
// intros
import intro_txt from './data/intro_text.json';
import dl_meta from './data/downloads.json';

const hdrs = {
  survey: 'Wellbeing indicators',
  risks: 'Health risks by town',
  scores: 'Index scores',
  chime: 'Hospital encounters'
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
    setNoteOpen(!noteOpen);
  };

  return (
    <div className="App">
      <Header hdrs={ objToArray(hdrs, 'location', 'title') } />

      <NoteContext.Provider value={ { noteOpen, handleClose } }>

        <Dash
          intro={ intro_txt[download.location] }
          note={ intro_txt['covid'] }
          download={ download }
        >
          <Switch>
            <Route exact path='/' render={ () => <Redirect to='/survey' /> } />
            <Route exact path='/survey'>
              <Survey
                data={ cws_data }
                meta={ cws_meta }
              />
            </Route>
            <Route exact path='/risks'>
              <Risks
                data={ town_data }
                meta={ filterTownLvl(filterByString(cws_meta, 'health')) }
                shape={ town_topo }
              />
            </Route>
            <Route exact path='/scores'>
              <Scores
                data={ index_data }
                index_comps={ index_comps }
                meta={ score_meta }
              />
            </Route>
            <Route exact path='/chime'>
              <Chime
                data={ chime_data }
                meta={ chime_meta }
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
