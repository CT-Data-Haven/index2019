import React, { useState } from 'react';

import { Container, Row, Col, Form } from 'react-bootstrap';
import useForm, { FormContext, useFormContext } from 'react-hook-form';

import { ChartStage, TableStage } from './Stage';
import Scatterplot from './Scatterplot';
import { IdxBarChart } from './BarChart';
import { ScoreMainControls, ScoreCompareControls, SparkControls } from './Controls';
import Intro from './Intro';
import DataTable from './DataTable';
import DataContext from './DataContext';
import { getVariables, getSubVariables, getRegions, filterForScatter, filterForBar, cleanIdxLabels } from '../components/utils.js';

import '../styles/Dash.css';


const Scores = ({ index_data, index_comps, meta }) => {
  const formMethods = useForm({
    mode: 'onChange'
  });
  const variables = getVariables(index_data);
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

  // const [formValues, setFormValues] = useState(initValues);

// event handling
  const onFormChange = (data, e) => {
    const { v1Select, v2Select, regSelect } = formMethods.getValues();
    setV1(v1Select);
    setV2(v2Select);
    setRegion(regSelect);
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

        <Row><Intro page='scores' /></Row>

        <header className='App-header'>
          <h2>How do groups and towns compare?</h2>
        </header>
        <Row className='align-items-end'>
          <Col md={ 6 }>
            <FormContext { ...formMethods }>
              <ScoreMainControls
                onChange={ formMethods.handleSubmit(onFormChange) }
                variables={ variables }
                regions={ getRegions(index_data) }
                v1={ v1 }
              />
            </FormContext>

            { /* bar chart */ }
            <DataContext.Provider value={ filterForBar(index_data, region, v1) }>
              <ChartStage
                vs={ [v1, v2] }
                region={ region }
                lbls={ [cleanIdxLabels(v1)] }
                type='bar'
                dataBy={ v1 === 'community' ? 'location' : 'group' }
                axisLbl={ 'Scores 0 (worse) through 1,000 (better)' }
              >
                <IdxBarChart vs={ [v1] } />
              </ChartStage>
            </DataContext.Provider>
          </Col>

          <Col md={ 6 } className='second'>
            <FormContext { ...formMethods }>
              <ScoreCompareControls
                onChange={ formMethods.handleSubmit(onFormChange) }
                variables={ variables }
                v1={ v1 }
                v2={ v2 }
              />
            </FormContext>

            { /* scatterplot */ }
            <DataContext.Provider value={ filterForScatter(index_data, region) }>
              <ChartStage
                vs={ [v1, v2] }
                region={ region }
                lbls={ [v1, v2].map((d) => cleanIdxLabels(d)) }
                type='scatter'
                axisLbl={ 'Scores 0 (worse) through 1,000 (better)' }
              >
                <Scatterplot vs={ [v1, v2] } />
              </ChartStage>
            </DataContext.Provider>
          </Col>
        </Row>

        <hr />

        <header className='App-header'>
          <h2>What are these scores made of?</h2>
        </header>
        <Row>
          <Col>
            <DataContext.Provider value={ filterForBar(index_comps[v1], region, v1) }>
              <TableStage
                v1={ v1 }
                region={ region }
                type='table'
                lbls={ [cleanIdxLabels(v1)] }
                dataBy={ v1 === 'community' ? 'location' : 'group' }
                hdrComponents={ <SparkControls checked={ spark } onChange={ onToggleChange } /> }
              >
                <DataTable v1={ v1 } meta={ meta[v1] }
                  spark={ spark }
                  sort={ true }
                />
              </TableStage>
            </DataContext.Provider>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Scores;
