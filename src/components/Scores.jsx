import React, { useState } from 'react';

import { Container, Row, Col } from 'react-bootstrap';
import useForm, { FormContext, useFormContext } from 'react-hook-form';

import { ChartStage, TableStage } from './Stage';
import Scatterplot from './Scatterplot';
import BarChart from './BarChart';
import { ScoreMainControls, ScoreCompareControls } from './Controls';
import Intro from './Intro';
import DataTable from './DataTable';
import DataContext from './DataContext';
import { getVariables, getSubVariables, getRegions, filterForScatter, filterForBar } from '../components/utils.js';

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

  // const [formValues, setFormValues] = useState(initValues);

// event handling
  const onChange = (data, e) => {
    const { v1Select, v2Select, regSelect } = formMethods.getValues();
    setV1(v1Select);
    setV2(v2Select);
    setRegion(regSelect);
  };
  console.log(index_data);

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
                onChange={ formMethods.handleSubmit(onChange) }
                variables={ variables }
                regions={ getRegions(index_data) }
                v1={ v1 }
              />
            </FormContext>

            { /* bar chart */ }
            <DataContext.Provider value={ filterForBar(index_data, region, v1) }>
              <ChartStage v1={ v1 } v2={ v2 } region={ region } type='bar'>
                <BarChart v1={ v1 } v2={ v2 } />
              </ChartStage>
            </DataContext.Provider>
          </Col>

          <Col md={ 6 } className='second'>
            <FormContext { ...formMethods }>
              <ScoreCompareControls
                onChange={ formMethods.handleSubmit(onChange) }
                variables={ variables }
                v2={ v2 }
              />
            </FormContext>

            { /* scatterplot */ }
            <DataContext.Provider value={ filterForScatter(index_data, region) }>
              <ChartStage v1={ v1 } v2={ v2 } region={ region } type='scatter'>
                <Scatterplot v1={ v1 } v2={ v2 } />
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
              <TableStage v1={ v1 } region={ region } type='table'>
                <DataTable v1={ v1 } meta={ meta[v1] }  />
              </TableStage>
            </DataContext.Provider>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Scores;
