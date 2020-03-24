import React, { useState } from 'react';

import { Container, Row, Col } from 'react-bootstrap';
import useForm, { FormContext } from 'react-hook-form';

import Stage from './Stage';
import Scatterplot from './Scatterplot';
import { IdxBarChart } from './BarChart';
import { ControlHolder, ScoreMainControls, ScoreCompareControls, SparkControls } from './Controls';
import Intro from './Intro';
import DataTable from './DataTable';
import { getVariables, getRegions, filterForScatter, filterForBar, cleanIdxLabels } from '../components/utils.js';

import '../styles/Dash.css';


const Scores = ({ data, index_comps, meta, intro }) => {
  const formMethods = useForm({
    mode: 'onChange'
  });
  const variables = getVariables(data);
  const initValues = {
    v1: variables[0],
    v2: variables[1],
    region: 'Connecticut'
  };

// state
  const [v1, setV1] = useState(initValues.v1);
  const [v2, setV2] = useState(initValues.v2);
  const [region, setRegion] = useState(initValues.region);
  const [spark, setSpark] = useState(true);

// event handling
  const onFormChange = (data, e) => {
    const { _v1, _v2, _region } = formMethods.getValues();
    setV1(_v1);
    setV2(_v2);
    setRegion(_region);
  };

  const onToggleChange = (e) => {
    setSpark(e.target.checked);
  };

  return (
    <div className='Dash Scores'>
      <Container>
        <header className="App-header">
          <h1>DataHaven Index scores</h1>
        </header>

        <Row><Intro page='scores' intro={ intro } /></Row>

        <header className='App-header'>
          <h2>How do groups and towns compare?</h2>
        </header>
        <Row className='align-items-end'>
          <Col md={ 6 }>
            <FormContext { ...formMethods }>
              <ControlHolder>
                <ScoreMainControls
                  onChange={ formMethods.handleSubmit(onFormChange) }
                  variables={ variables }
                  regions={ getRegions(data) }
                  // v1={ v1 }
                />
              </ControlHolder>
            </FormContext>

            { /* bar chart */ }
            <Stage
              type='lblBy2'
              lbl={ cleanIdxLabels(v1) }
              grouping={ region }
              dataBy={ v1 === 'community' ? 'location' : 'group' }
              axisLbl={ 'Scores 0 (worse) through 1,000 (better)' }
            >
              <IdxBarChart
                data={ filterForBar(data, region, v1) }
                rAccess={ v1 }
              />
            </Stage>
          </Col>

          <Col md={ 6 } className='second'>
            <FormContext { ...formMethods }>
              <ControlHolder>
                <ScoreCompareControls
                  onChange={ formMethods.handleSubmit(onFormChange) }
                  variables={ variables }
                  v1={ v1 }
                  v2={ v2 }
                />
              </ControlHolder>
            </FormContext>

            { /* scatterplot */ }
            <Stage
              lbls={ [v1, v2].map((d) => cleanIdxLabels(d)) }
              type='versus'
              axisLbl={ 'Scores 0 (worse) through 1,000 (better)' }
            >
              <Scatterplot
                data={ filterForScatter(data, region) }
                vs={ [v1, v2] }
              />
            </Stage>
          </Col>
        </Row>

        <hr />

        <Row>
          <Col>
            <h2>What are these scores made of?</h2>

            <Stage
              grouping={ region }
              type='lblBy2'
              lbl={ 'Components of the ' + cleanIdxLabels(v1) }
              dataBy={ v1 === 'community' ? 'location' : 'group' }
              axisLbl={ v1 === 'community' ? '' : 'Share of adults' }
              flush
              hdrComponents={ <SparkControls checked={ spark } onChange={ onToggleChange } /> }
            >
              <DataTable v1={ v1 } meta={ meta[v1] }
                data={ filterForBar(index_comps[v1], region, v1) }
                spark={ spark }
                sort={ true }
              />
            </Stage>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Scores;
