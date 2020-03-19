import React, { useState } from 'react';

import { Container, Row, Col } from 'react-bootstrap';
import useForm, { FormContext } from 'react-hook-form';

import { ChartStage, TableStage } from './Stage';
import { QBarChart } from './BarChart';
import { SurveyMainControls, SurveyProfileControls } from './Controls';
import Intro from './Intro';
import Profile from './Profile';
import { cleanHdrLabels, getQMeta, getProfile, getNestedGrps, fmt } from '../components/utils.js';

const Survey = ({ cws_data, meta, intro }) => {
  const formMethods = useForm({
    mode: 'onChange'
  });
  const topics = Object.keys(meta);
  const regions = Object.keys(cws_data);

  const initValues = {
    region: regions[0],
    topic: topics[0],
    indicator: meta[topics[0]][0].indicator,
    group: 'Total'
  };

// state
  const [region, setRegion] = useState(initValues.region);
  const [topic, setTopic] = useState(initValues.topic);
  const [indicator, setIndicator] = useState(initValues.indicator);
  const [group, setGroup] = useState(initValues.group);

// event handling
  const onChange = (data, e) => {
    const { regSelect, topicSelect, qSelect, grpSelect } = formMethods.getValues();

    // don't like setting state like this but oh well
    const q0 = meta[topicSelect][0].indicator;
    const g0 = initValues.group;
    if (e.target.name === 'topicSelect' || e.target.name === 'regSelect') {
      formMethods.setValue('qSelect', q0);
      formMethods.setValue('grpSelect', g0);
      setIndicator(q0);
      setGroup(g0);
    } else {
      setIndicator(qSelect);
      setGroup(grpSelect);
    }
    setRegion(regSelect);
    setTopic(topicSelect);

  };

  const qDisplay = getQMeta(meta[topic], indicator) || '';
  const groups = getNestedGrps(cws_data[region][topic]);
  const profileData = getProfile(cws_data[region][topic], 'group', group, meta[topic]);

  return (
    <div className='Dash Survey'>
      <Container>
        <header className="App-header">
          <h1>2018 Community Wellbeing Survey</h1>
        </header>


        <Row><Intro page='survey' intro={ intro } /></Row>

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
            <ChartStage
              vs={ [indicator] }
              region={ region }
              type='bar'
              lbls={ [qDisplay.display] }
              dataBy={ 'group' }
              axisLbl={ qDisplay.denom }
            >
              <QBarChart
                data={ cws_data[region][topic] }
                vs={ [indicator] }
                numFmt={ fmt('0.0%') }
              />
            </ChartStage>
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
            <TableStage
              style='ProfileStage'
              group={ group }
              type='profile'
              lbls={ [cleanHdrLabels(topic)] }
              axisLbl={ 'Share of adults' }
            >
              <Profile
                data={ profileData }
                topic={ topic }
                meta={ meta[topic] }
                cols={ ['Survey question', 'Value'] }
              />
            </TableStage>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Survey;
