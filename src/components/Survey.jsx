import React, { useState } from 'react';

import { Container, Row, Col } from 'react-bootstrap';
import useForm, { FormContext, useFormContext } from 'react-hook-form';

import { ChartStage, TableStage } from './Stage';
import Scatterplot from './Scatterplot';
import { QBarChart } from './BarChart';
import { SurveyMainControls, SurveyProfileControls } from './Controls';
import Intro from './Intro';
import Profile from './Profile';
import DataContext from './DataContext';
import { cleanKeys, cleanHdrLabels, getQMeta, getProfile, getNestedGrps, fmt } from '../components/utils.js';

const Survey = ({ cws_data, meta }) => {
  const formMethods = useForm({
    mode: 'onChange'
  });
  const topics = Object.keys(meta);
  const regions = Object.keys(cws_data);

  const initValues = {
    region: regions[0],
    topic: topics[0],
    question: meta[topics[0]][0].question,
    group: 'Total'
  };

// state
  const [region, setRegion] = useState(initValues.region);
  const [topic, setTopic] = useState(initValues.topic);
  const [question, setQuestion] = useState(initValues.question);
  const [group, setGroup] = useState(initValues.group);

// event handling
  const onChange = (data, e) => {
    const { regSelect, topicSelect, qSelect, grpSelect } = formMethods.getValues();

    // don't like setting state like this but oh well
    const q0 = meta[topicSelect][0].question;
    const g0 = initValues.group;
    if (e.target.name === 'topicSelect' || e.target.name === 'regSelect') {
      formMethods.setValue('qSelect', q0);
      formMethods.setValue('grpSelect', g0);
      setQuestion(q0);
      setGroup(g0);
    } else {
      setQuestion(qSelect);
      setGroup(grpSelect);
    }
    setRegion(regSelect);
    setTopic(topicSelect);

  };

  const qDisplay = getQMeta(meta[topic], question) || '';
  const groups = getNestedGrps(cws_data[region][topic]);
  const profileData = getProfile(cws_data[region][topic], group, meta[topic]);

  return (
    <div className='Dash Survey'>
      <Container>
        <header className="App-header">
          <h1>2018 Community Wellbeing Survey</h1>
        </header>


        <Row><Intro page='survey' /></Row>

        <header className='App-header'>
          {/* <h2>How do groups and towns compare?</h2> */}
        </header>
        <Row className=''>
          <Col md={ 6 }>
            <FormContext { ...formMethods }>
              <SurveyMainControls
                onChange={ formMethods.handleSubmit(onChange) }
                topics={ topics }
                regions={ regions }
                topicMeta={ meta[topic] }
              />
            </FormContext>
          </Col>
          <Col md={ 6 }>

          </Col>
        </Row>

        <Row>
          <Col md={ 6 }>
            { /* bar chart */ }
            <DataContext.Provider value={ cws_data[region][topic] }>
              <ChartStage
                vs={ [question] }
                region={ region }
                type='bar'
                lbls={ [qDisplay.display] }
                dataBy={ 'group' }
                axisLbl={ 'Share of adults' }
              >
                <QBarChart vs={ [question] } numFmt={ fmt('0.0%') } />
              </ChartStage>
            </DataContext.Provider>
          </Col>

          <Col md={ 6 } className='second'>
            <FormContext { ...formMethods }>
              <SurveyProfileControls
                onChange={ formMethods.handleSubmit(onChange) }
                groups={ groups }
                topicMeta={ meta[topic] }
              />
            </FormContext>
            { /* profile */ }
            <DataContext.Provider value={ profileData }>
              <TableStage
                style='ProfileStage'
                group={ group }
                type='profile'
                lbls={ [cleanHdrLabels(topic)] }
                axisLbl={ 'Share of adults' }
              >
                <Profile topic={ topic } meta={ meta[topic] } />
              </TableStage>
            </DataContext.Provider>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Survey;
