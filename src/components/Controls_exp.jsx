import React from 'react';
import { Form, Col, Row } from 'react-bootstrap';
import * as _ from 'lodash';
import { FormContext, useFormContext } from 'react-hook-form';
import { cleanIdxLabels } from './utils.js';

const Controls = (props) => {
  // const { register } = useFormContext();

  return (
    <div className='Controls'>
      <Form>
        <Row>
          { props.children }
        </Row>
      </Form>
    </div>
  );

};

const ScoreMainControls = (props) => {
  const { register } = useFormContext();
  console.log(props);
  return (
    <Controls>
      <Col>
        <Form.Group controlId='v1Select'>
          <Form.Label>Index values by group</Form.Label>
          <Form.Control as='select' name='v1Select' className='custom-select' ref={ props.register } onChange={ props.onChange }>
            { props.variables.map((d) => (
              <option key={ d + 'v1opt' } value={ d }>{ cleanIdxLabels(d) }</option>
            )) }
          </Form.Control>
        </Form.Group>
        <Form.Group controlId='regSelect'>
          <Form.Label>Filter region</Form.Label>
          <Form.Control as='select' name='regSelect' className='custom-select' ref={ props.register } onChange={ props.onChange }>
            { props.regions.map((d) => (
              <option key={ d + 'regopt' } value={ d }>{ d }</option>
            )) }
          </Form.Control>
        </Form.Group>
      </Col>
    </Controls>

  );
};

const ScoreCompareControls = (props) => {
  const { register } = useFormContext();
  const yvariables = _.drop(props.variables, 1).concat(_.take(props.variables, 1));
  return (
    <Controls>
      <Col className='second'>
        <Form.Group controlId='v2Select'>
          <Form.Label>Compare to a second index</Form.Label>
          <Form.Control as='select' name='v2Select' className='custom-select' ref={ props.register }  onChange={ props.onChange }>
            { yvariables.map((d) => (
              <option key={ d + 'v2opt' } value={ d }>{ cleanIdxLabels(d) }</option>
            )) }
          </Form.Control>
        </Form.Group>
      </Col>
    </Controls>
  );
};

export { ScoreMainControls, ScoreCompareControls };
