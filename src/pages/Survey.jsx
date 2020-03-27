import React, { useState } from 'react';

import { Row, Col } from 'react-bootstrap';
import useForm, { FormContext } from 'react-hook-form';

import Stage from '../components/Stage';
import { QBarChart } from '../components/BarChart';
import { ControlHolder, SurveyMainControls, GroupControls } from '../components/Controls';
import Profile from '../components/Profile';
import { cleanHdrLabels, getQMeta, getProfile, getNestedGrps, fmt } from '../utils/utils.js';

const Survey = ({ data, meta, intro }) => {
  const formMethods = useForm({
    mode: 'onChange'
  });
  const topics = Object.keys(meta);
  const regions = Object.keys(data);

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
    const { _region, _topic, _indicator, _group } = formMethods.getValues();

    // don't like setting state like this but oh well
    const q0 = meta[_topic][0].indicator;
    const g0 = initValues.group;
    if (e.target.name === '_topic' || e.target.name === '_region') {
      formMethods.setValue('_indicator', q0);
      formMethods.setValue('_group', g0);
      setIndicator(q0);
      setGroup(g0);
    } else {
      setIndicator(_indicator);
      setGroup(_group);
    }
    setRegion(_region);
    setTopic(_topic);
  };

  const onClick = (d) => {
    setGroup(d.group);
  };

  const qDisplay = getQMeta(meta[topic], indicator) || '';
  const groups = getNestedGrps(data[region][topic]);
  const profileData = getProfile(data[region][topic], 'group', group, meta[topic]);

  return (
    <div className='Survey'>
      <Row>
        <Col md={ 6 }>
          <FormContext { ...formMethods }>
            <ControlHolder>
              <SurveyMainControls
                onChange={ formMethods.handleSubmit(onChange) }
                topics={ topics }
                regions={ regions }
                meta={ meta[topic] }
              />
            </ControlHolder>
          </FormContext>
        </Col>
        <Col md={ 6 }>

        </Col>
      </Row>

      <Row>
        <Col md={ 6 }>
          { /* bar chart */ }
          <Stage
            type='lblBy2'
            lbl={ qDisplay.display }
            dataBy={ 'group' }
            grouping={ region }
            axisLbl={ qDisplay.denom }
          >
            <QBarChart
              data={ data[region][topic] }
              rAccess={ indicator }
              numFmt={ fmt('0.0%') }
              onClick={ onClick }
            />
          </Stage>
        </Col>

        <Col md={ 6 } className='second'>
          <FormContext { ...formMethods }>
            <ControlHolder>
              <GroupControls
                onChange={ formMethods.handleSubmit(onChange) }
                groups={ groups }
                meta={ meta[topic] }
              />
            </ControlHolder>
          </FormContext>
          { /* profile */ }
          <Stage
            type='colon'
            lbl={ cleanHdrLabels(topic) }
            grouping={ region }
            dataBy={ group }
            axisLbl={ qDisplay.denom }
            flush
          >
            <Profile
              data={ profileData }
              cols={ ['Survey question', 'Value'] }
            />
          </Stage>
        </Col>
      </Row>
    </div>
  );
};

export default Survey;
