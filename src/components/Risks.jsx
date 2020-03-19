import React, { useState } from 'react';

import { Container, Row, Col } from 'react-bootstrap';
import useForm, { FormContext } from 'react-hook-form';
import { schemeBuPu as palette } from 'd3-scale-chromatic';

import { ChartStage, TableStage } from './Stage';
import { RiskMainControls } from './Controls';
import Intro from './Intro';
import Choropleth from './Choropleth';
import Profile from './Profile';

import { getQMeta, getMapData, makeChoroScale, cleanHdrLabels, getProfile } from './utils.js';

const Risks = ({ town_data, meta, shape, intro }) => {
  const formMethods = useForm({
    mode: 'onChange'
  });
  const topics = Object.keys(meta);
  const initValues = {
    topic: topics[0],
    indicator: meta[topics[0]][0].indicator
  };

  const towns = Object.keys(getMapData(town_data[initValues.topic], initValues.indicator));
  // const towns = Object.keys(town_data[initValues.indicator][0]);
  const [topic, setTopic] = useState(initValues.topic);
  const [indicator, setIndicator] = useState(initValues.indicator);
  const [town, setTown] = useState(towns[0]);

  const onChange = (data, e) => {
    const { topicSelect, qSelect } = formMethods.getValues();
    const q0 = meta[topicSelect][0].indicator;
    if (e.target.name === 'topicSelect') {
      formMethods.setValue('qSelect', q0);
      setIndicator(q0);
    } else {
      setIndicator(qSelect);
    }
    setTopic(topicSelect);
  };

  const onFeatureClick = ({ layer }) => {
    setTown(layer.feature.properties.name);
  };

  const qDisplay = getQMeta(meta[topic], indicator) || '';
  const mapData = getMapData(town_data[topic], indicator);
  const profileData = getProfile(town_data[topic], 'name', town, meta[topic]);

  return (
    <div className='Dash Risks'>
      <Container>
        <header className='App-header'>
          <h1>2018 Community Wellbeing Survey</h1>
        </header>

        <Row>
          <Intro page='risks' intro={ intro } />
        </Row>

        <Row>
          <Col md={ 6 }>
            <FormContext { ...formMethods }>
              <RiskMainControls
                onChange={ formMethods.handleSubmit(onChange) }
                topics={ topics }
                topicMeta={ meta[topic] }
              />
            </FormContext>
          </Col>
        </Row>

        <Row>
          <Col md={ 6 }>
            <ChartStage
              type='map'
              lbls={ [qDisplay.display] }
              dataBy={ 'town' }
              axisLbl={ qDisplay.denom }
            >
              <Choropleth
                data={ mapData }
                shape={ shape }
                colorscale={ makeChoroScale(mapData, palette, 5) }
                meta={ { format: '.0%' } }
                onClick={ onFeatureClick }
              />
            </ChartStage>
          </Col>
          <Col md={ 6 } className='second'>
            <TableStage
              steez='ProfileStage'
              group={ town }
              type='profile'
              lbls={ [cleanHdrLabels(topic)] }
              axisLbl={ qDisplay.denom }
            >
              <Profile
                data={ profileData }
                topic={ topic }
                meta={ meta[topic] }
                cols={ [ 'Survey question', 'Value' ] }
              />
            </TableStage>
          </Col>
        </Row>
      </Container>
    </div>
  )
};

export default Risks;
