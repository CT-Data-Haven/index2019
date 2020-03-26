import React from 'react';
import { Card } from 'react-bootstrap';

import '../styles/Stage.css';
import { compileHeader } from '../utils/utils.js';

const Stage = (props) => {
  const hdr = compileHeader(props.type)({ ...props });

  return (
    <div className='Stage'>
      <Card>
        <Card.Header as='h3'>
          { hdr }
          { props.hdrComponents || null }
        </Card.Header>
        <Card.Body className={ props.flush && 'p-0' }>
          { props.children }
        </Card.Body>
        <Card.Footer className='text-right axis-title'>{ props.axisLbl || null }</Card.Footer>
      </Card>
    </div>
  );
};

export default Stage;
