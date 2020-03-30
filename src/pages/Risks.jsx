import React, { useState } from 'react';

import { Row, Col } from 'react-bootstrap';
import useForm, { FormContext } from 'react-hook-form';
import { schemeBuPu as palette } from 'd3-scale-chromatic';

import Stage from '../components/Stage';
import { ControlHolder, RiskMainControls } from '../components/Controls';
import Choropleth from '../components/Choropleth';
import Profile from '../components/Profile';

import { getQMeta, getMapData, makeChoroScale, cleanHdrLabels, getProfile } from '../utils/utils.js';

const Risks = ({ data, meta, shape, intro }) => {
  const formMethods = useForm({
    mode: 'onChange'
  });
  const topics = Object.keys(meta);
  const initValues = {
    topic: topics[0],
    indicator: meta[topics[0]][0].indicator
  };

  const towns = Object.keys(getMapData(data[initValues.topic], initValues.indicator));
  // const towns = Object.keys(data[initValues.indicator][0]);
  const [topic, setTopic] = useState(initValues.topic);
  const [indicator, setIndicator] = useState(initValues.indicator);
  const [town, setTown] = useState(towns[0]);

  const onChange = (data, e) => {
    const { _topic, _indicator } = formMethods.getValues();
    const q0 = meta[_topic][0].indicator;
    if (e.target.name === '_topic') {
      formMethods.setValue('_indicator', q0);
      setIndicator(q0);
    } else {
      setIndicator(_indicator);
    }
    setTopic(_topic);
  };

  const onFeatureClick = ({ layer }) => {
    setTown(layer.feature.properties.name);
  };

  const qDisplay = getQMeta(meta[topic], indicator) || '';
  const mapData = getMapData(data[topic], indicator);
  const profileData = getProfile(data[topic], 'name', town, meta[topic]);

  return (
    <div className='Risks'>
      <Row>
        <Col md={ 6 }>
          <FormContext { ...formMethods }>
            <ControlHolder>
              <RiskMainControls
                onChange={ formMethods.handleSubmit(onChange) }
                topics={ topics }
                indicators={ meta[topic] }
              />
            </ControlHolder>
          </FormContext>
        </Col>
      </Row>
      
      <Row>
        <Col md={ 6 }>
          <Stage
            type='lblBy'
            lbl={ qDisplay.display }
            dataBy={ 'town' }
            axisLbl={ qDisplay.denom }
            flush
          >
            <Choropleth
              data={ mapData }
              shape={ shape }
              colorscale={ makeChoroScale(mapData, palette, 5) }
              meta={ { format: '.0%' } }
              onClick={ onFeatureClick }
            />
          </Stage>
        </Col>
        <Col md={ 6 } className='second'>
          <Stage
            type='comma'
            lbl={ cleanHdrLabels(topic) }
            grouping={ town }
            axisLbl={ qDisplay.denom }
            flush
          >
            <Profile
              data={ profileData }
              cols={ [ 'Survey question', 'Value' ] }
            />
          </Stage>
        </Col>
      </Row>
    </div>
  )
};

export default Risks;
