import React from 'react';
import { Card } from 'react-bootstrap';

import '../styles/Stage.css';
import { cleanIdxLabels, compileHeader } from './utils.js';



const Stage = (props) => {
  const hdr = compileHeader(props.type)({ ...props });
  return (
    <Card>
      <Card.Header as='h3'>{ hdr }</Card.Header>
      <Card.Body>{ props.children }</Card.Body>
    </Card>
  );
};

const ChartStage = (props) => (
  <div className='Stage ChartStage'>
    <Stage
      lbl1={ cleanIdxLabels(props.v1) }
      lbl2={ cleanIdxLabels(props.v2) }
      dataBy={ props.v1 === 'community' ? 'location' : 'group' }
      { ...props }
    />
  </div>
);


const TableStage = (props) => (
  <div className='Stage TableStage'>
    <Stage
      lbl1={ cleanIdxLabels(props.v1) }
      dataBy={ props.v1 === 'community' ? 'location' : 'group' }
      type='table'
      { ...props }
    />
  </div>
);


export { ChartStage, TableStage };
