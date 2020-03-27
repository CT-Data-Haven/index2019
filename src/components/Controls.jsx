import React from 'react';
import { Form, Col, Row } from 'react-bootstrap';
import { useFormContext } from 'react-hook-form';
import { cleanIdxLabels, cleanHdrLabels, getComparables } from '../utils/utils.js';

import '../styles/Controls.css';

// controls:
// region
// topic
// question
// group
// index
// secondary
// age group
// condition

const ControlHolder = (props) => {
  return (
    <div className='Controls'>
      <Form>
        <Row>
          <Col>
            { props.children }
          </Col>
        </Row>
      </Form>
    </div>
  );
};

const Ctrl = (props) => {
  const { register } = useFormContext();

  return (
    <Form.Group controlId={ props.name }>
      <Form.Label>{ props.label || 'Select a ' + props.name.substring(1) }</Form.Label>
      <Form.Control
        as='select'
        name={ props.name }
        className='custom-select'
        ref={ register }
        onChange={ props.onChange }
      >
        { props.keys.map((d) => (
          <option key={ (d.value || d) + props.name } value={ d.value || d }>
            { d.display || cleanHdrLabels(d) }
          </option>
        )) }
      </Form.Control>
    </Form.Group>
  );
};

const NestedCtrl = (props) => {
  const { register } = useFormContext();

  return (
    <Form.Group controlId={ props.name }>
      <Form.Label>{ props.label || 'Select a ' + props.name.substring(1) }</Form.Label>
      <Form.Control
        as='select'
        name={ props.name }
        className='custom-select'
        ref={ register }
        onChange={ props.onChange }
      >
        { Object.keys(props.keys).map((d, i) => (
          <optgroup label={ d } key={ i + 'optgrp' }>
            { props.keys[d].map((e) => (
              <option value={ e } key={ e + 'grp' }>{ e }</option>
            )) }
          </optgroup>
        )) }
      </Form.Control>
    </Form.Group>
  );
};

const SurveyMainControls = (props) => (
  <React.Fragment>
    { /* region */ }
    <Ctrl name='_region' keys={ props.regions } onChange={ props.onChange } />
    { /* topic */ }
    <Ctrl name='_topic' keys={ props.topics } onChange={ props.onChange } />
    { /* question */ }
    <Ctrl name='_indicator'
      keys={ props.meta.map((d) => ({ value: d.indicator, display: d.display })) }
      onChange={ props.onChange }
      label='Select a survey question'
    />
  </React.Fragment>
);

const GroupControls = (props) => (
  <NestedCtrl name='_group' keys={ props.groups } onChange={ props.onChange } />
);

const ScoreMainControls = (props) => (
  <React.Fragment>
    { /* region */ }
    <Ctrl name='_region' keys={ props.regions } onChange={ props.onChange } />
    { /* score */ }
    <Ctrl name='_v1' keys={ props.variables } onChange={ props.onChange } label='Select an Index' />
  </React.Fragment>
);

const ScoreCompareControls = (props) => (
  <Ctrl name='_v2'
    keys={ getComparables(props.variables).map((d) => ({
      value: d, display: cleanIdxLabels(d)
    })) }
    onChange={ props.onChange }
    label={ `Compare ${ cleanHdrLabels(props.v1, false) } to a second index` }
  />
);

const SparkControls = (props) => (
  <div className='Controls SparkControls float-right'>
    <Form.Check
      inline
      custom
      checked={ props.checked }
      id='show-spark-bars'
      name='sparkToggle'
      onChange={ props.onChange }
      label='Show data bars'
    />
  </div>
);

const RiskMainControls = (props) => (
  <React.Fragment>
    { /* topic */ }
    <Ctrl name='_topic' keys={ props.topics } onChange={ props.onChange } />
    { /* question */ }
    <Ctrl name='_indicator'
      keys={ props.indicators.map((d) => ({ value: d.indicator, display: d.display })) }
      onChange={ props.onChange }
      label='Select a survey question'
    />
  </React.Fragment>
);

const ChimeMainControls = (props) => (
  <React.Fragment>
    { /* condition */ }
    <Ctrl name='_indicator'
      keys={ props.indicators.map((d) => ({ value: d.indicator, display: d.display })) }
      onChange={ props.onChange }
      label='Select a condition'
    />
    { /* age */ }
    <Ctrl name='_age' keys={ props.ages } onChange={ props.onChange } label='Select an age group' />
  </React.Fragment>
);

const InternetMainControls = (props) => (
  <React.Fragment>
    { /* indicator */ }
    <Ctrl name='_indicator'
      keys={ props.indicators.map((d) => ({ value: d.indicator, display: d.display })) }
      onChange={ props.onChange }
    />
  </React.Fragment>
);

export {
  ScoreMainControls, ScoreCompareControls,
  SurveyMainControls, GroupControls,
  SparkControls,
  RiskMainControls,
  ChimeMainControls,
  InternetMainControls,
  ControlHolder
};
