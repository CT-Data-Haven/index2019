import React from 'react';
import { Card } from 'react-bootstrap';

import '../styles/Stage.css';
import { cleanIdxLabels, cleanHdrLabels, compileHeader } from './utils.js';



const Stage = (props) => {
  const hdr = compileHeader(props.type)({ ...props });

  return (
    <Card>
      <Card.Header as='h3'>
        { hdr }
        { props.hdrComponents || null }
      </Card.Header>
      <Card.Body>
        { props.children }
      </Card.Body>
      <Card.Footer className='text-right axis-title'>{ props.axisLbl || null }</Card.Footer>
    </Card>
  );
};

const ChartStage = (props) => (
  <div className='Stage ChartStage'>
    <Stage
      lbls={ props.lbls.map((d) => d || cleanHdrLabels(d)) }
      { ...props }
    />
  </div>
);


const TableStage = (props) => (
  <div className={ props.style ? 'Stage TableStage ' + props.style : 'Stage TableStage' }>
    <Stage
      type={ props.type || 'table' }
      { ...props }
    />
  </div>
);


export { ChartStage, TableStage };
