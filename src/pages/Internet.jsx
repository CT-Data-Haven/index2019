import React, { useState } from 'react';

import { Row, Col } from 'react-bootstrap';
import useForm, { FormContext } from 'react-hook-form';
import { schemeBuPu as palette } from 'd3-scale-chromatic';

import Stage from '../components/Stage';
import { ControlHolder, InternetMainControls } from '../components/Controls';
import Choropleth from '../components/Choropleth';
import Profile from '../components/Profile';

import { getQMeta, getMapData, makeChoroScale, cleanHdrLabels, getProfile } from '../utils/utils.js';

const Internet = ({ data, meta, shape, intro }) => {
  const formMethods = useForm({
    mode: 'onChange'
  });
  const initValues = {
    indicator: meta[0].indicator
  };
  const towns = Object.keys(getMapData(data, initValues.indicator));
  const [indicator, setIndicator] = useState(initValues.indicator);
  const [town, setTown] = useState(towns[0]);

  const onChange = (data, e) => {
    const { _indicator } = formMethods.getValues();
    setIndicator(_indicator);
  };

  const onFeatureClick = ({ layer }) => {
    setTown(layer.feature.properties.name);
  };

  const qDisplay = getQMeta(meta, indicator) || '';
  const mapData = getMapData(data, indicator);
  const profileData = getProfile(data, 'name', town, meta);

  return (
    <div className='Internet'>
      <Row>
        <Col md={ 6 }>
          <FormContext { ...formMethods }>
            <ControlHolder>
              <InternetMainControls
                onChange={ formMethods.handleSubmit(onChange) }
                indicators={ meta }
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
              meta={ { ...qDisplay } }
              min={ 0.01 }
              onClick={ onFeatureClick }
            />
          </Stage>
        </Col>
        <Col md={ 6 } className='second'>
          <Stage
            type='comma'
            lbl={ 'Internet and computer access' }
            grouping={ town }
            axisLbl={ qDisplay.denom }
            flush
          >
            <Profile
              data={ profileData }
              cols={ [ 'Indicator', 'Value' ] }
            />
          </Stage>
        </Col>
      </Row>
    </div>
  );
};

export default Internet;
