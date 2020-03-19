import React from 'react';
import { Form, Col, Row } from 'react-bootstrap';
import { useFormContext } from 'react-hook-form';
import { cleanIdxLabels, cleanHdrLabels, getComparables } from './utils.js';

import '../styles/Controls.css';

const ScoreMainControls = (props) => {
  const { register } = useFormContext();

  return (
    <div className='Controls'>
      <Form>
        <Row>
          <Col>
            <Form.Group controlId='v1Select'>
              <Form.Label>Index values by group</Form.Label>
              <Form.Control as='select' name='v1Select' className='custom-select' ref={ register } onChange={ props.onChange }>
                { props.variables.map((d, i) => (
                  <option key={ d + 'v1opt' } value={ d }>{ cleanIdxLabels(d) }</option>
                )) }
              </Form.Control>
            </Form.Group>
            <Form.Group controlId='regSelect'>
              <Form.Label>Filter region</Form.Label>
              <Form.Control as='select' name='regSelect' className='custom-select' ref={ register } onChange={ props.onChange }>
                { props.regions.map((d, i) => (
                  <option key={ d + 'regopt' } value={ d }>{ d }</option>
                )) }
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

const ScoreCompareControls = (props) => {
  const { register } = useFormContext();
  const yvariables = getComparables(props.variables);

  return (
    <div className='Controls'>
      <Form>
        <Row>
          <Col>
            <Form.Group controlId='v2Select'>
              <Form.Label>Compare { cleanHdrLabels(props.v1, false) } to a second index</Form.Label>
              <Form.Control as='select' name='v2Select' className='custom-select' ref={ register }  onChange={ props.onChange }>
                { yvariables.map((d, i) => (
                  <option key={ d + 'v2opt' } value={ d }>{ cleanIdxLabels(d) }</option>
                )) }
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

const SparkControls = (props) => (
  <div className='Controls SparkControls float-right'>
    <Form.Check
      inline
      custom
      // default
      checked={ props.checked }
      id='show-spark-bars'
      name='sparkToggle'
      onChange={ props.onChange }
      label='Show data bars'
    />
  </div>
);

const SurveyTopicFragment = (props) => (
  <React.Fragment>
    <Form.Group controlId='topicSelect'>
      <Form.Label>Select a topic</Form.Label>
      <Form.Control as='select' name='topicSelect' className='custom-select' ref={ props.register } onChange={ props.onChange }>
        { props.topics.map((d, i) => (
          <option key={ d + 'topicopt' } value={ d }>{ cleanHdrLabels(d) }</option>
        )) }
      </Form.Control>
    </Form.Group>

    <Form.Group controlId='qSelect'>
      <Form.Label>Select survey question</Form.Label>
      <Form.Control as='select' name='qSelect' className='custom-select' ref={ props.register } onChange={ props.onChange }>
        { props.topicMeta.map((d, i) => (
          <option key={ d.indicator + 'qopt' } value={ d.indicator }>{ d.display }</option>
        )) }
      </Form.Control>
    </Form.Group>
  </React.Fragment>
);

const SurveyMainControls = (props) => {
  const { register } = useFormContext();

  return (
    <div className='Controls'>
      <Form>
        <Row>
          <Col>
            <Form.Group controlId='regSelect'>
              <Form.Label>Filter region</Form.Label>
              <Form.Control as='select' name='regSelect' className='custom-select' ref={ register } onChange={ props.onChange }>
                { props.regions.map((d, i) => (
                  <option key={ d + 'regopt' } value={ d }>{ d }</option>
                )) }
              </Form.Control>
            </Form.Group>

            <SurveyTopicFragment { ...props } register={ register } />
          </Col>
        </Row>
      </Form>
    </div>
  );
};

const SurveyProfileControls = (props) => {
  const { register } = useFormContext();
  const categories = Object.keys(props.groups);

  return (
    <div className='Controls'>
      <Form>
        <Row>
          <Col>
            <Form.Group controlId='grpSelect'>
              <Form.Label>Select a group</Form.Label>
              <Form.Control as='select' name='grpSelect' className='custom-select' ref={ register } onChange={ props.onChange }>
                {
                  categories.map((d, i) => (
                    <optgroup label={ d } key={ d + 'optgrp' }>
                      { props.groups[d].map((e, j) => (
                        <option value={ e } key={ j + 'grp' }>{ e }</option>
                      )) }
                    </optgroup>
                  ))
                }
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </div>
  )
};

const RiskMainControls = (props) => {
  const { register } = useFormContext();

  return (
    <div className='Controls'>
      <Form>
        <Row>
          <Col>
            <SurveyTopicFragment { ...props } register={ register } />
          </Col>
        </Row>
      </Form>
    </div>
  )
};


// export default Controls;
export { ScoreMainControls, ScoreCompareControls, SurveyMainControls, SurveyProfileControls, SparkControls, RiskMainControls };
