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

const Survey = () => {
  return (
    <Container>
      <header className="App-header">
        <h1>2018 Community Wellbeing Survey</h1>
      </header>

      <Row><Intro page='survey' /></Row>
    </Container>
  );
};

export default Survey;
