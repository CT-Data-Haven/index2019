import React from 'react';
import { Row, Col } from 'react-bootstrap';

const Resources = (props) => {
  return (
    <div className='Resources'>
      <Row>
        <Col>
          <h3>COVID-19 information and resources</h3>
          <ul>
            { props.covid && props.covid.map((d, i) => (
              <li key={ `covid-li-${ i }` }>
                <a href={ d.url }>{ d.display }</a>
              </li>
            )) }
          </ul>
          <h3>General DataHaven resources</h3>
          <ul>
            { props.datahaven && props.datahaven.map((d, i) => (
              <li key={ `dh-li-${ i }` }>
                <a href={ d.url }>{ d.display }</a>
              </li>
            )) }
          </ul>
        </Col>
      </Row>
    </div>
  )
};

export default Resources;
